import React, {JSX, useMemo, useState} from "react";
import {Button, Card, Text} from "react-native-paper";
import {Case} from "../models/Case";
import {router} from "expo-router";
import services from "../services/Services";
import {globalStyles, nbsp} from "../styles/globalStyles";
import {ImageBackground, TouchableOpacity, View} from "react-native";
import {displayImg} from "../../assets";
import EmotionCard from "@/src/components/EmotionsModel";
import DistortionThoughtsModel from "@/src/components/DistortionThoughtsModel";
import {useTranslation} from "react-i18next";
import {CreateCaseCardStyles} from "@/src/styles/caseCardStyles";

interface CaseProps {
    diary: number;
    caseItem: Case;
    isRTL: boolean;
}

export default function CaseCard({ diary, caseItem, isRTL }: CaseProps): JSX.Element {
    console.log("CaseCard");
    const {t} = useTranslation();
    const styles = useMemo(() => CreateCaseCardStyles(isRTL), [isRTL]);

    const [isEmotionsModalVisible, setIsEmotionsModalVisible] = useState(false);
    const [isDistortionsModalVisible, setIsDistortionsModalVisible] = useState(false);

    const onPressEmotionsModal = () => setIsEmotionsModalVisible(!isEmotionsModalVisible);
    const onPressDistortionsModal = () => setIsDistortionsModalVisible(!isDistortionsModalVisible);


    const editCase = () => {
        router.push({ pathname: '/editCase', params: { diary: diary, id: caseItem.id } });
    };

    const deleteCase = () => {
        services.deleteCase(diary, caseItem.id);
        console.log("deleteCase");

        switch (diary) {
            case 1:
                router.replace('/(tabs)/firstDiary');
                break;
            case 2:
                router.replace('/(tabs)/secondDiary');
                break;
        }
    };

    return (
        <Card style={styles.card}>
            <Card.Title
                title={caseItem.caseName}
                subtitle={caseItem.caseDate.toLocaleDateString('he-IL')}
                style={styles.cardTitleContainer}
                titleStyle={styles.cardTitleText}
                subtitleStyle={styles.cardSubtitleText}
            />

            <Card.Content>
                {/* description */}
                <Text style={styles.text}>
                    <Text style={styles.label}>{t("case.description")}{':' + nbsp}</Text>{caseItem.caseDescription}
                </Text>


                {/* thought */}
                <Text style={styles.text}>
                    <Text style={styles.label}>{t("case.thought")}{':' + nbsp}</Text>{caseItem.thought}
                </Text>

                {/* emotions */}
                <ImageBackground
                    source={displayImg}
                    style={globalStyles.background}
                    resizeMode="stretch"
                >
                    <TouchableOpacity style={globalStyles.modelOpener} onPress={onPressEmotionsModal}>
                        <Text style={styles.linkText}>
                            {t("case.emotions display")}
                        </Text>
                    </TouchableOpacity>

                    {isEmotionsModalVisible && (
                        <EmotionCard  emotions={caseItem.emotions} onPress={onPressEmotionsModal} />
                    )}

                </ImageBackground>


                {/* behavior */}
                {diary === 1 && (
                    <>
                        {/* behavior */}
                        <Text style={styles.text}>
                            <Text style={styles.label}>{t("case.behavior")}{':' + nbsp}</Text>{caseItem.behavior}
                        </Text>
                        {/* symptoms */}
                        <Text style={styles.text}>
                            <Text style={styles.label}>{t("case.symptoms")}{':' + nbsp}</Text>{caseItem.symptoms}
                        </Text>
                    </>
                )}


                {diary === 2 && (
                    <>
                        {/* Distortions */}
                        <View style={{ height: 20 }} />
                        <ImageBackground
                            source={displayImg}
                            style={globalStyles.background}
                            resizeMode="stretch"
                        >
                            <TouchableOpacity style={globalStyles.modelOpener} onPress={onPressDistortionsModal}>
                                <Text style={styles.linkText}>
                                    {t("case.distortionThoughts")}
                                </Text>
                            </TouchableOpacity>

                            {isDistortionsModalVisible && (
                                <DistortionThoughtsModel  distortionThoughts={caseItem.distortions} onPress={onPressDistortionsModal} />
                            )}
                        </ImageBackground>
                        {/* counterThoughts */}
                        <Text style={styles.text}>
                            <Text style={styles.label}>{t("case.counterThoughts")}{':' + nbsp}</Text>{caseItem.counterThoughts}
                        </Text>
                    </>
                )}


            </Card.Content>

            <Card.Actions style={styles.actionsButtonsContainer}>
                <View style={styles.actionButtonWrap}>
                    <Button
                        mode="contained"
                        style={styles.actionsButton}
                        onPress={editCase}
                    >
                        {t("case.actions.edit")}
                    </Button>
                </View>
                <View style={styles.actionButtonWrap}>
                    <Button
                        mode="contained"
                        style={styles.actionsButton}
                        onPress={deleteCase}
                    >
                        {t("case.actions.delete")}
                    </Button>
                </View>
            </Card.Actions>
        </Card>
    );
}

