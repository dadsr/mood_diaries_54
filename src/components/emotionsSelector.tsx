import React, {JSX, useMemo, useState} from "react";
import {Control, Controller} from "react-hook-form";
import {CaseFormValues} from "../models/Types";
import {EmotionKey, EmotionsConst} from "../models/consts/EmotionsConst";
import {ScrollView as DefaultScrollView, Text, View, TouchableWithoutFeedback} from "react-native";
import {Emotion} from "../models/Emotion";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import {useTranslation} from "react-i18next";
import {nbsp} from "../styles/globalStyles";
import {createEmotionsSelectorStyles} from "@/src/styles/emotionsSelectorStyles";
import {SafeAreaView} from 'react-native-safe-area-context';
import isEqual from 'lodash.isequal';


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

    const [open, setOpen] = useState(false);
    const [pickerValue, setPickerValue] = useState<EmotionKey[]>([]);

    const dropdownItems = useMemo(
        () => {
        return Object.keys(EmotionsConst).map((key) => ({
            label: t(`emotions.${key}`),
            value: key as EmotionKey,
        }));
    }, [t]);

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
                    const currentFieldKeys = (field.value?.map((e: Emotion) => e.getEmotion) || [])
                        .filter(Boolean) as EmotionKey[];

                    React.useLayoutEffect(() => {
                        if (!isEqual(currentFieldKeys, pickerValue)) {
                            setPickerValue(currentFieldKeys);
                        }
                    }, [JSON.stringify(currentFieldKeys)]); // Use JSON.stringify for stable comparison

                    const handleDropdownChange = (selectedValues: EmotionKey[]) => {
                        const updatedEmotions = selectedValues.map((key) => {
                            const existingEmotion = field.value?.find(
                                (emotion: Emotion) => emotion.getEmotion === key
                            );
                            return new Emotion(
                                key,
                                existingEmotion ? existingEmotion.getIntensity : 50
                            );
                        });

                        field.onChange(updatedEmotions);
                    };

                    const handleSliderChange = (emotionKey: EmotionKey, newIntensity: number) => {
                        const updatedEmotions = field.value?.map((emotion: Emotion) =>
                            emotion.getEmotion === emotionKey
                                ? new Emotion(emotionKey, newIntensity)
                                : emotion
                        ) || [];
                        field.onChange(updatedEmotions);
                    };

                    return (
                            <View>
                                    <View style={styles.selectorContainer}>
                                        <DropDownPicker
                                            value={pickerValue}
                                            setValue={setPickerValue}
                                            items={items}
                                            setItems={setItems}
                                            open={open}
                                            setOpen={setOpen}
                                            listMode="SCROLLVIEW"
                                            onChangeValue={(value) => {
                                                if (value) {
                                                    handleDropdownChange(value as EmotionKey[]);
                                                }
                                            }}
                                            multiple={true}
                                            mode="BADGE"
                                            min={0}
                                            max={items.length}
                                            searchable={false}
                                            searchPlaceholder={t('emotionsSelector.search')}
                                            placeholder={t('emotionsSelector.chooseEmotion')}
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
                                                {t(`emotions.${emotionKey}`)}
                                            </Text>

                                            <View style={styles.sliderWithMarkings}>
                                                <View style={styles.markingsContainer}>
                                                    {renderSliderMarkings()}
                                                </View>



                                            <Slider
                                                style={styles.slider}
                                                minimumValue={0}
                                                maximumValue={100}
                                                value={intensity}
                                                step={10}
                                                onValueChange={(value) => {
                                                    handleSliderChange(emotionKey, Math.round(value));
                                                }}
                                            />
                                            <Text>{intensity}%</Text>
                                            </View>
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
