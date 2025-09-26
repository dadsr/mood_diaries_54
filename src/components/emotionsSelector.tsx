import React, { useMemo } from "react";
import { Control, Controller } from "react-hook-form";
import { CaseFormValues, EmotionOption } from "../models/Types";
import { EmotionKey, EmotionsConst } from "../models/consts/EmotionsConst";
import { I18nManager, StyleSheet, View, Text } from "react-native";
import { Emotion } from "../models/Emotion";
import Slider from "@react-native-community/slider";
import { MultiSelect } from 'react-native-element-dropdown';
import { COLORS } from "../styles/themConstants";
import { useTranslation } from "react-i18next";
import { nbsp } from "../styles/globalStyles";
import { JSX } from "react";

interface EmotionsSelectorProps {
    diary: number;
    control: Control<CaseFormValues>;
    name: "emotions";
}

export function EmotionsSelector({ diary, control, name }: EmotionsSelectorProps): JSX.Element {
    console.log("EmotionsSelector");

    const { t, i18n } = useTranslation();


    const emotionOptions: EmotionOption[] = useMemo(() => {
        return Object.keys(EmotionsConst).map((key) => ({
            value: key as EmotionKey,
            label: t(`emotions.${key}`),
            intensity: 50
        }));
    }, [t, i18n.language]);


    const getEmotionDisplayName = (emotionKey: EmotionKey): string => {
        return t(`emotions.${emotionKey}`);
    };


    const renderSliderMarkings = () => {
        const markings = [];
        for (let i = 0; i <= 100; i += 10) {
            markings.push(
                <View key={i} style={[styles.sliderMark, { left: `${i}%` }]}>
                    <View style={styles.markLine} />
                </View>
            );
        }
        return markings;
    };


    const isRTL = I18nManager.isRTL;
    const textAlign = isRTL ? 'right' : 'right';
    const flexDirection = isRTL ? 'row-reverse' : 'row-reverse';

    return (
        <View style={styles.container}>
            <Text style={[styles.heading, { textAlign }]}>
                {t('emotionsSelector.emotions')}{':' + nbsp}
            </Text>

            <Controller
                name={name}
                control={control}
                render={({ field }) => {

                    const selectValue: EmotionOption[] = Array.isArray(field.value) ?
                        field.value
                            .filter((emotion: Emotion) =>
                                emotion.getEmotion !== null &&
                                emotion.getEmotion !== undefined
                            )
                            .map((emotion: Emotion) => ({
                                value: emotion.getEmotion as EmotionKey,
                                label: getEmotionDisplayName(emotion.getEmotion as EmotionKey),
                                intensity: emotion.getIntensity
                            })) : [];

                    return (
                        <View>
                            <View style={styles.selectorContainer}>
                                <MultiSelect
                                    selectedTextStyle={[styles.multiSelectPlaceholder, { textAlign }]}
                                    inputSearchStyle={[styles.multiSelectSearch, { textAlign }]}
                                    iconStyle={styles.multiSelectIcon}
                                    data={emotionOptions}
                                    labelField="label"
                                    valueField="value"
                                    value={selectValue.map(option => option.value)}

                                    onChange={(selectedKeys: string[]) => {
                                        const emotions = selectedKeys.map((key: string) => {
                                            const existingEmotion = selectValue.find(
                                                option => option.value === key
                                            );
                                            return new Emotion(
                                                key as EmotionKey,
                                                existingEmotion ? existingEmotion.intensity : 50
                                            );
                                        });
                                        field.onChange(emotions);
                                    }}

                                    placeholder={t('emotionsSelector.chooseEmotion')}
                                    search
                                    searchPlaceholder={t('emotionsSelector.search')}
                                />
                            </View>


                            {selectValue.map((option: EmotionOption) => (
                                <View key={option.value} style={styles.sliderContainer}>
                                    <Text style={[styles.emotionLabel, { textAlign }]}>
                                        {option.label}
                                    </Text>

                                    <View style={styles.sliderWithMarkings}>
                                        <View style={styles.markingsContainer}>
                                            {renderSliderMarkings()}
                                        </View>

                                        <Slider
                                            style={styles.slider}
                                            minimumValue={0}
                                            maximumValue={100}
                                            step={10}
                                            value={option.intensity}
                                            onValueChange={(value) => {
                                                const updated = field.value.map((emotion: Emotion) =>
                                                    emotion.getEmotion === option.value
                                                        ? new Emotion(option.value, parseInt(value.toString()))
                                                        : emotion
                                                );
                                                field.onChange(updated);
                                            }}
                                            minimumTrackTintColor="#007AFF"
                                            maximumTrackTintColor="#CCCCCC"
                                        />
                                    </View>

                                    <Text style={[styles.intensityValue, { textAlign: 'center' }]}>
                                        {option.intensity}%
                                    </Text>
                                </View>
                            ))}
                        </View>
                    );
                }}
            />
        </View>
    );
}

// Step 10: Enhanced styles with RTL considerations
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingStart: 16,
        paddingEnd: 16,
        paddingTop: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sliderMark: {
        position: 'absolute',
        alignItems: 'center',
        transform: [{ translateX: -5 }],
    },
    markLine: {
        width: 1,
        height: 6,
        backgroundColor: '#666',
        marginBottom: 2,
    },
    selectorContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: COLORS.primary,
        backgroundColor:'rgba(222,211,196,0.28)',
        borderRadius: 15

    },
    multiSelectPlaceholder: {
        fontSize: 16,
        color: COLORS.text,

    },
    multiSelectSearch: {
        height: 50,
        fontSize: 16,

    },
    multiSelectIcon: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
    },
    sliderContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        marginVertical: 5,
        backgroundColor: 'rgba(176,253,170,0.42)',
    },
    emotionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    sliderWithMarkings: {
        position: 'relative',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        marginVertical: 10,
    },
    markingsContainer: {
        position: 'absolute',
        top: 15,
        left: 15,
        right: 15,
        height: 30,
        pointerEvents: 'none',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    intensityValue: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: 'bold',
    }
});
