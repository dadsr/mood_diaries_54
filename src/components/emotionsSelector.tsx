import React, { JSX, useMemo, useState, useCallback } from "react";
import { Control, Controller } from "react-hook-form";
import { CaseFormValues } from "../models/Types";
import { EmotionKey, EmotionsConst } from "../models/consts/EmotionsConst";
import {Keyboard, Text, ScrollView as DefaultScrollView, View} from "react-native";
import { Emotion } from "../models/Emotion";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import { nbsp } from "../styles/globalStyles";
import { createEmotionsSelectorStyles } from "@/src/styles/emotionsSelectorStyles";
import {SafeAreaView} from "react-native-safe-area-context";

interface EmotionsSelectorProps {
    diary: number;
    control: Control<CaseFormValues>;
    name: "emotions";
    isRTL: boolean;
}

export function EmotionsSelector({ diary, control, name, isRTL }: EmotionsSelectorProps): JSX.Element {
    console.log("EmotionsSelector");
    const styles = useMemo(() => createEmotionsSelectorStyles(isRTL), [isRTL]);
    const { t } = useTranslation();

    // DropDownPicker internal state - separate from form state
    const [open, setOpen] = useState(false);
    const [pickerValue, setPickerValue] = useState<EmotionKey[]>([]);

    // Convert emotions const to dropdown items
    const dropdownItems = useMemo(() => {
        return Object.keys(EmotionsConst).map((key) => ({
            label: t(`emotions.${key}`),
            value: key as EmotionKey,
        }));
    }, [t]);

    // Keep items in state (required by DropDownPicker)
    const [items, setItems] = useState(dropdownItems);

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

    return (
        <SafeAreaView style={styles.container}>
            <DefaultScrollView style={styles.scrollView}>
            <Text style={styles.heading}>
                {t('emotionsSelector.emotions')}{':' + nbsp}
            </Text>

            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    // Handler for dropdown value changes
                    const handleDropdownChange = useCallback((selectedValues: any) => {
                        // Handle both single value and array cases
                        let keys: EmotionKey[] = [];

                        if (selectedValues === null || selectedValues === undefined) {
                            keys = [];
                        } else if (Array.isArray(selectedValues)) {
                            keys = selectedValues as EmotionKey[];
                        } else {
                            keys = [selectedValues as EmotionKey];
                        }

                        // Update picker internal state
                        setPickerValue(keys);

                        // Update form state
                        const updatedEmotions = keys.map((key) => {
                            const existingEmotion = field.value?.find(
                                (emotion: Emotion) => emotion.getEmotion === key
                            );
                            return new Emotion(
                                key,
                                existingEmotion ? existingEmotion.getIntensity : 50
                            );
                        });
                        field.onChange(updatedEmotions);
                    }, [field]);

                    // Handler for slider changes
                    const handleSliderChange = useCallback((emotionKey: EmotionKey, newIntensity: number) => {
                        const updatedEmotions = field.value.map((emotion: Emotion) =>
                            emotion.getEmotion === emotionKey
                                ? new Emotion(emotionKey, newIntensity)
                                : emotion
                        );
                        field.onChange(updatedEmotions);
                    }, [field]);

                    const handleOutsidePress = () => {
                        if (open) {
                            setOpen(false);
                            Keyboard.dismiss();
                        }
                    };

                    const handleDropdownPress = (event: any) => {
                        // Prevent the outside press handler from firing when touching the dropdown itself
                        event.stopPropagation();
                    };


                    return (
                            <View>
                                    <View style={styles.selectorContainer}>
                                        <DropDownPicker
                                            open={open}
                                            setOpen={setOpen}
                                            value={pickerValue}
                                            setValue={setPickerValue}
                                            items={items}
                                            setItems={setItems}
                                            listMode="SCROLLVIEW"
                                            multiple={true}
                                            mode="BADGE"
                                            min={0}
                                            max={items.length}

                                            // Search configuration
                                            searchable={false}
                                            searchPlaceholder={t('emotionsSelector.search')}
                                            placeholder={t('emotionsSelector.chooseEmotion')}

                                            // RTL styling
                                            style={{
                                                flexDirection: isRTL ? 'row-reverse' : 'row',
                                                ...styles.multiSelectSearch,
                                            }}
                                            textStyle={styles.multiSelectPlaceholder}
                                            containerStyle={{
                                                flexDirection: isRTL ? 'row-reverse' : 'row',
                                            }}
                                            dropDownContainerStyle={{
                                                flexDirection: isRTL ? 'row-reverse' : 'row',
                                            }}
                                            badgeStyle={{
                                                flexDirection: isRTL ? 'row-reverse' : 'row',
                                            }}
                                            badgeTextStyle={styles.multiSelectPlaceholder}

                                            // Handle value changes
                                            onChangeValue={handleDropdownChange}

                                            // RTL support
                                            rtl={isRTL}
                                        />
                                    </View>

                                {/* Render sliders for selected emotions */}
                                {field.value?.map((emotion: Emotion) => {
                                    const emotionKey = emotion.getEmotion as EmotionKey;
                                    const intensity = emotion.getIntensity;

                                    return (
                                        <View key={emotionKey} style={styles.sliderContainer}>
                                            <Text style={styles.emotionLabel}>
                                                {getEmotionDisplayName(emotionKey)}
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
                                                    value={intensity}
                                                    onValueChange={(value) => {
                                                        handleSliderChange(emotionKey, parseInt(value.toString()));
                                                    }}
                                                    minimumTrackTintColor="#007AFF"
                                                    maximumTrackTintColor="#CCCCCC"
                                                />
                                            </View>

                                            <Text style={[styles.intensityValue, { textAlign: 'center' }]}>
                                                {intensity}%
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                    );
                }}
            />
            </DefaultScrollView>
        </SafeAreaView>
    );
}
