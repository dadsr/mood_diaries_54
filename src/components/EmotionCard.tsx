import {globalStyles} from "../styles/globalStyles";
import {ImageBackground, View, Text, StyleSheet} from "react-native";
import {modelImg} from "../../assets";
import {Emotion} from "../models/Emotion";
import Slider from "@react-native-community/slider";
import {COLORS} from "../styles/themConstants";
import {useTranslation} from "react-i18next";
import {JSX} from "react";



interface EmotionsProps {
    emotions: Emotion[];
}


export default function EmotionCard(props: EmotionsProps):JSX.Element {
    console.log("EmotionCard");

    const {t} = useTranslation();
    const {emotions} = props;
    console.log("emotions - ", emotions.length);


    // Function to render markings for slider
    const renderSliderMarkings = () => {
        const markings = [];
        for (let i = 0; i <= 100; i += 10) {
            markings.push(
                <View key={i} style={[styles.sliderMark, {left: `${i}%`}]}>
                    <View style={styles.markLine}/>
                </View>
            );
        }
        return markings;
    };


    return (
        <ImageBackground
            source={modelImg}
            style={globalStyles.background}
            resizeMode="cover"
        >
             <View style={globalStyles.container}>
                {emotions.length === 0 ? (
                    <View style={styles.noEmotionsContainer}>
                        <Text style={styles.noEmotionsText}> {t("emotionCard.no emotions text")}</Text>
                    </View>
                ) : (
                    emotions.map((emotion:Emotion, index: number) => (
                        <View key={index} style={styles.sliderContainer}>
                            <Text style={styles.sliderLabel}>t(`emotion`)</Text>

                            <View style={styles.sliderWithMarkings} >
                                <View style={styles.markingsContainer}>
                                    {renderSliderMarkings()}
                                </View>

                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={10}
                                    value={emotion.getIntensity}
                                    minimumTrackTintColor="#4630EB"
                                    maximumTrackTintColor="#4630EB"
                                    thumbTintColor="#4630EB"
                                    disabled={true}
                                />
                                <Text style={styles.intensityValue}>{emotion.getIntensity}%</Text>
                            </View>
                        </View>
                    ))
                )}
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
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
        backgroundColor:"#a90000"
    },
    sliderWithMarkings: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        height: 40,
    },
    markingsContainer: {
        position: 'absolute',
        top: 20, // Center vertically relative to the slider's track
        left: 10, // Adjust based on slider's internal padding
        right: 10, // Adjust based on slider's internal padding
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
