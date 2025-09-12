import {globalStyles} from "../styles/globalStyles";
import { View, Text, StyleSheet, Modal, TouchableOpacity, I18nManager} from "react-native";
import {Emotion} from "../models/Emotion";
import Slider from "@react-native-community/slider";
import {COLORS} from "../styles/themConstants";
import {useTranslation} from "react-i18next";
import React, {JSX, useState} from "react";



interface EmotionsProps {
     emotions: Emotion[];
    onPress: () => void;
}

export default function EmotionsModel({ emotions,onPress }: EmotionsProps): JSX.Element {

    console.log("EmotionsModel");
    const {t} = useTranslation();
    const [isModalVisible,setIsModalVisible]= useState(true);
    const closeModel = () => {
        setIsModalVisible(false);
        onPress();
        console.log("closeModel");
    };


    return (
        <Modal
            visible={isModalVisible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={ onPress }
        >

            <View style={styles.container}>

                <View style={styles.heading}>
                    <Text style={styles.headingText}>{t("case.emotions")}:</Text>
                </View>

                <View style={styles.modalContent}>

                    {emotions.length === 0 ? (

                        <View style={styles.noEmotionsContainer}>
                            <Text style={styles.noEmotionsText}>
                                {t("emotionCard.no emotions text")}
                            </Text>
                        </View>
                    ) : (
                        emotions.map((emotion: Emotion, idx: number) => (
                            <View key={idx} style={styles.sliderContainer}>
                                <Text style={styles.sliderLabel}>
                                    {t(`emotions.${emotion.getEmotion}`)}
                                </Text>
                                <View style={styles.sliderWithMarkings}>
                                    <Slider
                                        style={styles.slider}
                                        value={emotion.getIntensity}
                                        minimumValue={0}
                                        maximumValue={100}
                                        step={1}
                                        minimumTrackTintColor={COLORS.primary}
                                        maximumTrackTintColor={COLORS.accent}
                                        thumbTintColor={COLORS.primary}
                                        disabled // <-- Important: read-only
                                    />
                                    <View style={styles.markingsContainer}>
                                        {
                                            [...Array(11)].map((_, i) => (
                                                    <View  key={i}  style={[ styles.sliderMark, { left: `${i * 10}%` }]}>
                                                        <View style={styles.markLine} />
                                                    </View>
                                                )
                                            )
                                        }
                                    </View>
                                </View>
                                <Text style={styles.intensityValue}>
                                    {emotion.getIntensity}%
                                </Text>
                            </View>
                        ))
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={globalStyles.button} onPress={ closeModel }>
                        <Text style={globalStyles.buttonText}>{t("navigation.back")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:"column",
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 20,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },

    heading: {
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    },
    headingText:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: I18nManager.isRTL ? 'right' : 'left',
    },
    modalContent:{
        padding: 10,
        backgroundColor: COLORS.background,
        borderWidth: 2,
        borderColor:'black',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    noEmotionsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noEmotionsText: {
        fontSize: 18,
        lineHeight: 28,
        textAlign: 'center',
        color: '#666',
    },

    sliderContainer: {
        padding: 20,
        marginBottom: 25,
        width: '100%',
        borderWidth: 2,
        borderColor: COLORS.accent,
    },
    sliderLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: '#333',
    },
    sliderWithMarkings: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        height: 40,
    },
    markingsContainer: {
        position: 'absolute',
        top: 20,
        left: 10,
        right: 10,
        height: 1,
    },
    slider: {
        flex: 1,
        height: 40,
    },

    intensityValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginLeft: 15,
        minWidth: 45,
    },

    sliderMark: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        top: -5,
    },
    markLine: {
        width: 1.5,
        height: 10,
        backgroundColor: '#a9a9a9',
        borderRadius: 1,
    }

});





