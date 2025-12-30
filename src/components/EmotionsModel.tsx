import {globalStyles} from "../styles/globalStyles";
import {ImageBackground, Modal, ScrollView as DefaultScrollView, Text, TouchableOpacity, View} from "react-native";
import {Emotion} from "../models/Emotion";
import Slider from "@react-native-community/slider";
import {COLORS} from "../styles/themConstants";
import {useTranslation} from "react-i18next";
import React, {JSX, useMemo, useState} from "react";
import {backgroundImg} from "@/assets";
import {createEmotionsModelStyles} from "@/src/styles/emotionsModelStyles";


interface EmotionsProps {
    emotions: Emotion[];
    onPress: () => void;
    isRTL: boolean;
}

export default function EmotionsModel({ emotions, onPress, isRTL }: EmotionsProps): JSX.Element {
    console.log("EmotionsModel");
    const {t} = useTranslation();
    const styles = useMemo(() => createEmotionsModelStyles(isRTL), [isRTL]);
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
            <ImageBackground
                source={backgroundImg}
                style={globalStyles.background}
                resizeMode="stretch"
            >
                <View style={styles.container}>

                    <View style={styles.heading}>
                        <Text style={styles.headingText}>{t("case.emotions")}:</Text>
                    </View>



                    {emotions.length === 0 ? (
                        <View style={[styles.modalContent, styles.noEmotionsContent]}>
                            <Text style={styles.noEmotionsText}>{t("emotionModel.no emotions text")}</Text>
                        </View>

                    ) : (
                        <View style={styles.modalContent}>

                            <DefaultScrollView style={styles.scrollView} contentContainerStyle={{paddingBottom: 16, }}>
                                {emotions.map((emotion: Emotion, idx: number) => (
                                    <View key={idx} style={styles.sliderContainer}>
                                        <Text style={styles.sliderLabel}>
                                            {t(`emotions.${emotion.getEmotion}`)}
                                        </Text>
                                        <View style={styles.sliderWithMarkings}>
                                            <Slider
                                                style={styles.slider}
                                                value={100-emotion.getIntensity}
                                                minimumValue={0}
                                                maximumValue={100}
                                                step={1}
                                                minimumTrackTintColor={COLORS.primary}
                                                maximumTrackTintColor={COLORS.accent}
                                                thumbTintColor={COLORS.primary}
                                                disabled
                                            />
                                            <View style={styles.markingsContainer}>
                                                {
                                                    [...Array(11)].map((_, i) => (
                                                            <View  key={i}  style={[ styles.sliderMark, { right: `${i * 10}%` }]}>
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
                                ))}
                            </DefaultScrollView>
                        </View>
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={globalStyles.button} onPress={ closeModel }>
                        <Text style={globalStyles.buttonText}>{t("navigation.back")}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </Modal>
    );
}

