import {JSX, useCallback, useState} from "react";
import {FAB} from "react-native-paper";
import {router, useFocusEffect} from "expo-router";
import {I18nManager, ScrollView as DefaultScrollView, StyleSheet, Text, View} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import services from "../services/Services";
import {Case} from "../models/Case";
import {globalStyles} from "../styles/globalStyles";
import CaseCard from "./CaseCard";
import {useTranslation} from "react-i18next";
import {COLORS} from "../styles/themConstants";


type DiaryProps = {
    diary:number;
};

export default function DiaryScreen({ diary }: DiaryProps): JSX.Element {
    console.log("DiaryScreen ",diary);
    // ALWAYS force RTL to be true regardless of languager

    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);

    const {t} = useTranslation();

    const insets = useSafeAreaInsets();
    const [cases, setCases] = useState<Case[]>([]);

    useFocusEffect (
        useCallback(() => {
            console.log("FirstDiary focused, fetching cases...");
            services.getCases(diary).then((fetchedCases: Case[]) => {
                setCases(fetchedCases)
            })
        },[])
    );

    const addNewCase = () => {
        console.log('add new case');
        router.push({ pathname: '/editCase', params: { diary:diary, id: 0 } });

    };


    return (
        <SafeAreaView  style = {[styles.container, {
            paddingTop: Math.max(insets.top + 8,20),
            paddingBottom: Math.max(insets.bottom - 25,20)}]}>

            <Text style = {globalStyles.heading}>{t("diary.events list")}:</Text>

            <DefaultScrollView  style = {globalStyles.scrollView}>
                {cases.length > 0 ?(
                    cases.map(c =>
                        <CaseCard key={c.id} diary={diary} moodCase={c} />
                    )
                ): (
                    <View style = {styles.noEventsContainer}>
                        <Text style={styles.noEventsTextHeader}>{t("diary.no events found.")}</Text>
                        <Text style={styles.noEventsText}>{t("diary.click Add Event to get started.")}</Text>
                    </View>
                )}
            </DefaultScrollView >

            <FAB
                icon="plus"
                color= "#fff"
                size="medium"
                onPress={addNewCase}
                style={{
                    position: "absolute",
                    [I18nManager.isRTL ? "left" : "right"]: 16,
                    bottom: insets.bottom - 15 ,
                    backgroundColor: COLORS.secondary
                }}
            />

        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 50,
    },

    noEventsContainer: {

    },
    noEventsTextHeader: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    },
    noEventsText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
    }


});
