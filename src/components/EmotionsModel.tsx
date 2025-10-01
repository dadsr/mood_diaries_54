import {globalStyles} from "../styles/globalStyles";
import {View, Text, StyleSheet, Modal, TouchableOpacity, I18nManager, ImageBackground,  ScrollView as DefaultScrollView} from "react-native";
import {Emotion} from "../models/Emotion";
import Slider from "@react-native-community/slider";
import {COLORS} from "../styles/themConstants";
import {useTranslation} from "react-i18next";
import React, {JSX, useState} from "react";
import {backgroundImg} from "@/assets";



interface EmotionsProps {
    emotions: Emotion[];
    onPress: () => void;
    isRTL?: boolean;
}

export default function EmotionsModel({ emotions, onPress, isRTL }: EmotionsProps): JSX.Element {
    console.log("EmotionsModel");
    const {t} = useTranslation();
    const [isModalVisible,setIsModalVisible]= useState(true);


    const closeModel = () => {
        setIsModalVisible(false);
        onPress();
        console.log("closeModel");
    };


    const styles = StyleSheet.create({
        container:{
            flex: 1,
            flexDirection:"column",
            paddingStart: 16,
            paddingEnd: 16,
            paddingTop: 20,
            textAlign: isRTL ? 'right' : 'right',
        },

        heading: {
            flexDirection: isRTL ? 'row-reverse' : 'row-reverse',
        },
        headingText:{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: isRTL ? 'right' : 'right',
        },

        modalContent:{
            flex: 1,
            padding: 10,
            marginBottom: 30,
        },
        noEmotionsContent:{
            backgroundColor: 'rgba(171,179,210,0.56)',
            borderWidth:2,
            borderColor: 'black',
            borderRadius: 11,
            marginBottom: 80,

        },

        scrollView: {
            borderColor: '#000020',
        },

        buttonContainer: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 16,
            alignItems: 'center',
        },

        noEmotionsText: {
            fontSize: 30,
            lineHeight: 28,
            padding: 5,
            textAlign: isRTL ? 'right' : 'right',
            color: '#060000',
        },

        sliderContainer: {
            padding: 20,
            marginBottom: 25,
            width: '100%',
            borderWidth: 2,
            borderRadius:25,
            borderColor: COLORS.black,
        },
        sliderLabel: {
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 20,
            color: '#333',
            textAlign: isRTL ? 'right' : 'right',
        },
        sliderWithMarkings: {
            flexDirection: 'row-reverse',
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
            flexDirection: 'row-reverse',
            flex: 1,
            height: 40,
        },

        intensityValue: {
            fontSize: 16,
            fontWeight: '500',
            color: '#333',
            marginLeft: 15,
            minWidth: 45,
            textAlign: isRTL ? 'right' : 'right',
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

