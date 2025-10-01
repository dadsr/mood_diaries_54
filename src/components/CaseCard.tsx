import React, {JSX, useEffect, useState} from "react";
import {Button, Card, Text} from "react-native-paper";
import {Case} from "../models/Case";
import {router} from "expo-router";
import services from "../services/Services";
import {globalStyles, nbsp} from "../styles/globalStyles";
import {I18nManager, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {displayImg} from "../../assets";
import {COLORS, THEME_CONSTANTS} from "../styles/themConstants";
import EmotionCard from "@/src/components/EmotionsModel";
import DistortionThoughtsModel from "@/src/components/DistortionThoughtsModel";
import {useTranslation} from "react-i18next";

interface CaseProps {
    diary: number;
    caseItem: Case;
    isRTL: boolean;
}

export default function CaseCard({ diary, caseItem, isRTL }: CaseProps): JSX.Element {
    console.log("CaseCard");
    const {t} = useTranslation();

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

    const styles = StyleSheet.create({
        card: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            backgroundColor: COLORS.white,
            borderRadius: 8,
            padding: 12,
            marginVertical: 10,
            borderWidth: 2,
            borderColor: COLORS.black,
            elevation: 3,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 2 },
        },

        cardTitleContainer: {
            paddingVertical: 8,
            paddingHorizontal: 10,
            marginBottom: 10,
        },

        cardTitleContent: {
            alignItems: 'center',
        },

        cardTitleText: {
            fontSize: 20,
            fontWeight:THEME_CONSTANTS.TYPOGRAPHY.WEIGHTS.BOLD ,
            textAlign: isRTL ? 'right' : 'left',
        },

        cardSubtitleText: {
            fontSize: 12,
            opacity: 0.8,
            textAlign:'center',
        },

        text: {
            fontSize: 16,
            fontWeight:THEME_CONSTANTS.TYPOGRAPHY.WEIGHTS.REGULAR ,
            marginBottom: 8,
            color: '#333',
            textAlign: isRTL ? 'right' : 'left',
        },
        label:{
            fontWeight:THEME_CONSTANTS.TYPOGRAPHY.WEIGHTS.BOLD ,
            fontSize:18,
            textAlign: isRTL ? 'right' : 'left',
        },
        linkText: {
            fontSize: 16,
            fontWeight:THEME_CONSTANTS.TYPOGRAPHY.WEIGHTS.BOLD ,
            color: COLORS.black,
            textAlign: 'center',
        },



        actionsButtonsContainer: {
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
        },

        actionButtonWrap: {
            width: '48%',
        },

        actionsButton: {
            borderRadius: 12,
            paddingVertical: 6,
            backgroundColor: COLORS.primary,
        },
    });


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

