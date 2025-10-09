import {JSX, useCallback, useMemo, useState} from "react";
import {FAB} from "react-native-paper";
import {router, useFocusEffect} from "expo-router";
import {ScrollView as DefaultScrollView, Text, View} from "react-native";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import services from "../services/Services";
import {Case} from "../models/Case";
import CaseCard from "./CaseCard";
import {useTranslation} from "react-i18next";
import {COLORS} from "@/src/styles/themConstants";
import {createDiaryScreenStyles} from "@/src/styles/diaryScreenStyles";

type DiaryProps = {
    diary: number;
    isRTL: boolean;
};

export default function DiaryScreen({ diary, isRTL }: DiaryProps): JSX.Element {
    console.log("DiaryScreen");
    console.log("isRTL ", isRTL);
    const styles = useMemo(() => createDiaryScreenStyles(isRTL), [isRTL]);

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
