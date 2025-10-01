import {JSX, useCallback, useState} from "react";
import {FAB} from "react-native-paper";
import {router, useFocusEffect} from "expo-router";
import {ScrollView as DefaultScrollView, StyleSheet, Text, View} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import services from "../services/Services";
import {Case} from "../models/Case";
import CaseCard from "./CaseCard";
import {useTranslation} from "react-i18next";
import {COLORS} from "@/src/styles/themConstants";

type DiaryProps = {
    diary: number;
    isRTL: boolean;
};

export default function DiaryScreen({ diary, isRTL }: DiaryProps): JSX.Element {
    console.log("DiaryScreen");
    console.log("isRTL ", isRTL);

    const {t} = useTranslation();
    const insets = useSafeAreaInsets();
    const [cases, setCases] = useState<Case[]>([]);

    useFocusEffect(
        useCallback(() => {
            services.getCases(diary).then((fetchedCases: Case[]) => {
                setCases(fetchedCases)
            })
        }, [diary])
    );

    const addNewCase = () => {
        router.push({pathname: '/editCase', params: {diary, id: 0}});
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
        },
        heading: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: isRTL ? "right" : "left",
            writingDirection: isRTL ? 'rtl' : 'ltr',
        },

        noEventsContainer: {
            alignItems: isRTL ? "flex-end" : "flex-start",
            padding: 20,
           },
        noEventsTextHeader: {
            fontSize: 18,
            lineHeight: 24,
            marginBottom: 20,
            textAlign: isRTL ? "right" : "left",
            writingDirection: isRTL ? 'rtl' : 'ltr',
        },
        noEventsText: {
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 20,
            textAlign: isRTL ? "right" : "left",
            writingDirection: isRTL ? 'rtl' : 'ltr',
        },
        scrollView: {
            borderColor: '#000020',
            writingDirection: isRTL ? 'rtl' : 'ltr',
        },
    });

    return (
        <SafeAreaView
            style={[styles.container]}
            edges={['top', 'right', 'left']}
        >

            <Text style={styles.heading}>{t("diary.events list")}:</Text>

            <DefaultScrollView style={styles.scrollView}>
                {cases.length > 0 ? (
                    cases.map(c =>
                        <CaseCard key={c.id} diary={diary} caseItem={c} isRTL={isRTL}/>
                    )
                ) : (
                    <View style={styles.noEventsContainer}>
                        <Text style={styles.noEventsTextHeader}>{t("diary.no events found.")}</Text>
                        <Text style={styles.noEventsText}>{t("diary.click Add Event to get started.")}</Text>
                    </View>
                )}
            </DefaultScrollView>

            <FAB
                icon="plus"
                color="#fff"
                size="medium"
                onPress={addNewCase}
                style={{
                    position: "absolute",
                    [isRTL ? "left" : "left"]: 10,
                    bottom: insets.bottom - 5,
                    backgroundColor: COLORS.secondary
                }}
            />

        </SafeAreaView>
    );
}
