import React, {JSX, useEffect, useState} from "react";
import {Button, Card, Text} from "react-native-paper";
import {Case} from "../models/Case";
import {router} from "expo-router";
import services from "../services/Services";
import {globalStyles} from "../styles/globalStyles";
import {I18nManager, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {displayImg} from "../../assets";
import {COLORS} from "../styles/themConstants";
import EmotionCard from "@/src/components/EmotionsModel";
import DistortionThoughtsModel from "@/src/components/DistortionThoughtsModel";
import {useTranslation} from "react-i18next";

interface CaseProps {
    diary: number;
    moodCase: Case;
}

export default function CaseCard({diary,moodCase}: CaseProps): JSX.Element {
    console.log("CaseCard");
    const {t} = useTranslation();


    const [isEmotionsModalVisible, setIsEmotionsModalVisible] = useState(false);
    const [isDistortionsModalVisible, setIsDistortionsModalVisible] = useState(false);

    const onPressEmotionsModal = () => setIsEmotionsModalVisible(!isEmotionsModalVisible);
    const onPressDistortionsModal = () => setIsDistortionsModalVisible(!isDistortionsModalVisible);


    const editCase = () => {
        router.push({ pathname: '/editCase', params: { diary: diary, id: moodCase.id } });
    };

    const deleteCase = () => {
        services.deleteCase(diary, moodCase.id);
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
                title={moodCase.caseName}
                subtitle={moodCase.caseDate.toLocaleDateString('he-IL')}
                style={styles.cardTitleContainer}
                titleStyle={styles.cardTitleText}
                subtitleStyle={styles.cardSubtitleText}
            />

            <Card.Content>
                {/* description */}
                <Text style={globalStyles.text}>
                    {t("case.description")}: {moodCase.caseDescription}
                </Text>

                {/* thought */}
                <Text style={globalStyles.text}>
                    {t("case.thought")}: {moodCase.thought}
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
                        <EmotionCard  emotions={moodCase.emotions} onPress={onPressEmotionsModal} />
                    )}

                </ImageBackground>


                {/* behavior */}
                {diary === 1 && (
                    <>
                        {/* behavior */}
                        <Text style={globalStyles.text}>
                            {t("case.behavior")}: {moodCase.behavior}
                        </Text>
                        {/* symptoms */}
                        <Text style={globalStyles.text}>
                            {t("case.symptoms")}: {moodCase.symptoms}
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
                                <DistortionThoughtsModel  distortionThoughts={moodCase.distortions} onPress={onPressDistortionsModal} />
                            )}
                        </ImageBackground>
                        {/* counterThoughts */}
                        <Text style={globalStyles.text}>
                            {t("case.counterThoughts")}: {moodCase.counterThoughts}
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

const styles = StyleSheet.create({
    card: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
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
        fontWeight: 'bold',
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    cardSubtitleText: {
        fontSize: 12,
        opacity: 0.8,
        textAlign:'center',
    },


    linkText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
        textAlign: 'center',
    },



    actionsButtonsContainer: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
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
