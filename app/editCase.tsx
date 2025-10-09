import React, {JSX, useEffect, useMemo, useState} from "react";
import {
    BackHandler,
    ImageBackground,
    Modal,
    ScrollView as DefaultScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {SafeAreaView ,useSafeAreaInsets} from 'react-native-safe-area-context';
import {globalStyles, nbsp} from "../src/styles/globalStyles";
import {router, useLocalSearchParams} from "expo-router";
import {CaseFormValues} from "../src/models/Types";
import {Controller, useForm} from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import {backgroundImg, modelImg, settingsImg} from "../assets";
import {useTranslation} from "react-i18next";
import {Emotion} from "../src/models/Emotion";
import {DistortionThought} from "../src/models/DistortionThought";
import {Case} from "../src/models/Case";
import services from "../src/services/Services";
import MultiSelectCheckboxes from "../src/components/MultiSelectCheckboxes";
import {DistortionsThoughtKey, distortionsThoughtsArray} from "../src/models/consts/DistortionsThoughtsConst";
import {EmotionsSelector} from "../src/components/emotionsSelector";
import { useLanguage } from "../src/hooks/LanguageContext";
import {createEditCaseStyles} from "@/src/styles/editCaseStyles";

export default function EditCase(): JSX.Element {
    console.log("EditCase");
    const { isRTL } = useLanguage();
    const insets = useSafeAreaInsets();
    const styles = useMemo(() => createEditCaseStyles(isRTL,insets), [isRTL]);

    console.log(isRTL, "isRTL in editCase")
    const {t} = useTranslation();
    const diary: number = Number(useLocalSearchParams().diary);
    const id: number = Number(useLocalSearchParams().id);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [isEmotionsModalVisible, setIsEmotionsModalVisible] = useState(false);
    const [isThoughtsModalVisible, setIsThoughtsModalVisible] = useState(false);
    const [selectedDistortions, setSelectedDistortions] = useState<string[]>([]);

    const {control, handleSubmit, setValue, watch, formState: {errors}} = useForm<CaseFormValues>({
        defaultValues: {
            id: 0,
            caseName: '',
            caseDate: new Date(),
            caseDescription: '',
            thought: '',
            emotions: [] as Emotion[],
            behavior: '',
            symptoms: '',
            distortions: [] as DistortionThought[],
            counterThoughts: '',
        }
    });



    useEffect(() => {
        if (id > 0) {
            (async () => {
                const myCase: Case | null = await services.getCase(diary, id);
                if (myCase) {
                    setValue('id', myCase.id);
                    setValue('caseName', myCase.caseName!);
                    setValue('caseDate', myCase.caseDate!);
                    setValue('caseDescription', myCase.caseDescription!);
                    setValue('thought', myCase.thought!);
                    setValue('behavior', myCase.behavior!);
                    setValue('symptoms', myCase.symptoms!);
                    setValue('emotions', myCase.emotions.map((emotion: Emotion) => new Emotion(emotion.getEmotion, emotion.getIntensity)));
                    setValue('distortions', myCase.distortions.map((thought: DistortionThought) => new DistortionThought(thought.getDistortion)));
                    setValue('counterThoughts', myCase.counterThoughts!);
                }
            })();
        }
    }, [id, setValue, diary]);

    const handleBack = () => {
        if (diary === 1) {
            router.replace('/firstDiary');
        } else if (diary === 2) {
            router.replace('/secondDiary');
        } else {
            router.back();
        }
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {handleBack(); return true;}
        );
        return () => backHandler.remove();
    }, [diary]);

    const openEmotionsModal = () => setIsEmotionsModalVisible(true);
    const closeEmotionsModal = () => setIsEmotionsModalVisible(false);
    const openThoughtsModal = () => setIsThoughtsModalVisible(true);
    const closeThoughtsModal = () => setIsThoughtsModalVisible(false);

    const currentDistortions = (watch('distortions') as DistortionThought[]) || [];
    const initialSelectedIds = currentDistortions
        .map(d => d.getDistortion)
        .filter((id): id is DistortionsThoughtKey => !!id);

    const handleDistortionsSave = () => {
        const distortionObjects = selectedDistortions.map(distortionId =>
            new DistortionThought(distortionId as DistortionsThoughtKey)
        );
        setValue('distortions', distortionObjects);
        closeThoughtsModal();
    };

    const submitForm = async (data: CaseFormValues) => {
        setIsSubmitting(true);
        const caseInstance = new Case();
        caseInstance.id = data.id;
        caseInstance.caseName = data.caseName;
        caseInstance.caseDate = data.caseDate;
        caseInstance.caseDescription = data.caseDescription;
        caseInstance.thought = data.thought;
        caseInstance.emotions = data.emotions.map(
            (emotion: Emotion) => new Emotion(emotion.getEmotion, emotion.getIntensity)
        );
        caseInstance.behavior = data.behavior;
        caseInstance.symptoms = data.symptoms;
        caseInstance.distortions = data.distortions.map(
            (thought: DistortionThought) => new DistortionThought(thought.getDistortion)
        );
        caseInstance.counterThoughts = data.counterThoughts;

        try {
            if (caseInstance.id > 0) await services.updateCase(diary, caseInstance);
            else
                await services.addCase(diary, caseInstance);
            handleBack();
        } catch (error) {
            console.error("Error saving case:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ImageBackground
            source={backgroundImg}
            style={globalStyles.background}
            resizeMode="stretch"
        >
            <SafeAreaView style={styles.container}>
                <DefaultScrollView style={styles.scrollView}>
                    <Text style={styles.heading}>{t("editCase.editing event")}:</Text>

                    <Text style={styles.label}>{t("editCase.eventName")}{':' + nbsp}</Text>
                    <Controller
                        control={control}
                        name="caseName"
                        rules={{required: t("editCase.caseNameRequired") || "Case name is required"}}
                        render={({field: {onChange, value}}) => (
                            <TextInput style={styles.input} value={value} onChangeText={onChange}/>
                        )}
                    />
                    {errors.caseName && <Text style={styles.error}>{errors.caseName.message}</Text>}

                    <Text style={styles.label}>{t("editCase.date")}{':' + nbsp}</Text>
                    <Controller
                        control={control}
                        name="caseDate"
                        render={({field: {onChange, value}}) => (
                            <>
                                <TouchableOpacity onPress={() => setShowPicker(true)}>
                                    <Text style={styles.dateText}>
                                        {value ? value.toLocaleDateString() : t("editCase.selectDate")}
                                    </Text>
                                </TouchableOpacity>
                                {showPicker && (
                                    <DateTimePicker
                                        value={value || new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={(_, selectedDate) => {
                                            setShowPicker(false);
                                            if (selectedDate) onChange(selectedDate);
                                        }}
                                    />)}
                            </>
                        )}
                    />

                    <Text style={styles.label}>{t("editCase.description")}{':' + nbsp}</Text>
                    <Controller
                        control={control}
                        name="caseDescription"
                        render={({field: {onChange, value}}) => (
                            <TextInput style={[styles.input, styles.textarea]}
                                       value={value} onChangeText={onChange} multiline numberOfLines={4}/>
                        )}
                    />

                    <Text style={styles.label}>{t("editCase.thought")}{':' + nbsp}</Text>
                    <Controller
                        control={control}
                        name="thought"
                        render={({field: {onChange, value}}) => (
                            <TextInput style={[styles.input, styles.textarea]}
                                       value={value} onChangeText={onChange} multiline numberOfLines={4}/>
                        )}
                    />

                    <Text style={styles.label}>{t("editCase.emotions")}{':' + nbsp}</Text>
                    <ImageBackground source={modelImg} style={globalStyles.background} resizeMode="stretch">
                        <TouchableOpacity style={globalStyles.modelOpener} onPress={openEmotionsModal}>
                            <Text style={styles.emotionsTitle}>{t("editCase.emotions selection")}</Text>
                        </TouchableOpacity>
                    </ImageBackground>

                    {diary === 1 && (
                        <>
                            <Text style={styles.label}>{t("editCase.behavior")}{':' + nbsp}</Text>
                            <Controller
                                control={control}
                                name="behavior"
                                render={({field: {onChange, value}}) => (
                                    <TextInput style={[styles.input, styles.textarea]}
                                               value={value} onChangeText={onChange} multiline numberOfLines={3}/>
                                )}
                            />
                        </>
                    )}

                    {diary === 1 && (
                        <>
                            <Text style={styles.label}>{t("editCase.symptoms")}{':' + nbsp}</Text>
                            <Controller
                                control={control}
                                name="symptoms"
                                render={({field: {onChange, value}}) => (
                                    <TextInput style={[styles.input, styles.textarea]}
                                               value={value} onChangeText={onChange} multiline numberOfLines={3}/>
                                )}
                            />
                        </>
                    )}

                    {diary === 2 && (
                        <>
                            <Text style={styles.label}>{t("editCase.distortion thoughts")}{':' + nbsp}</Text>
                            <ImageBackground source={modelImg} style={globalStyles.background} resizeMode="stretch">
                                <TouchableOpacity style={globalStyles.modelOpener} onPress={openThoughtsModal}>
                                    <Text style={styles.emotionsTitle}>{t("editCase.distortion thoughts")}</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                            <Text style={styles.label}>{t("editCase.counter thoughts")}{':' + nbsp}</Text>
                            <Controller
                                control={control}
                                name="counterThoughts"
                                render={({field: {onChange, value}}) => (
                                    <TextInput style={[styles.input, styles.textarea]}
                                               value={value} onChangeText={onChange} multiline numberOfLines={3}/>
                                )}
                            />
                        </>
                    )}

                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            isSubmitting && styles.submitButtonDisabled
                        ]}
                        onPress={handleSubmit(submitForm)}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.submitButtonText}>
                            {isSubmitting ? t("editCase.saving") || "Saving..." : t("editCase.save")}
                        </Text>
                    </TouchableOpacity>
                </DefaultScrollView>

                {/* Emotions Modal */}
                <Modal
                    visible={isEmotionsModalVisible}
                    animationType="fade"
                    presentationStyle="pageSheet"
                    onRequestClose={closeEmotionsModal}
                >
                    <SafeAreaView style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={closeEmotionsModal}>
                                <Text style={styles.exitButton}>↩</Text>
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>{t("editCase.emotions selection")}</Text>
                            <View style={{width: 30}} />
                        </View>
                        <View style={{flex: 1}}>
                            <EmotionsSelector diary={diary} control={control} name="emotions" isRTL={isRTL}/>
                        </View>
                        <View style={styles.footerContainer}>
                            <TouchableOpacity
                                style={styles.footerButton}
                                onPress={closeEmotionsModal}>
                                <Text style={styles.footerButtonText}>{t("editCase.save")}</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>

                {/* Thoughts (Distortions) Modal */}
                <Modal
                    visible={isThoughtsModalVisible}
                    animationType="slide"
                    onRequestClose={closeThoughtsModal}
                >
                    <SafeAreaView style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={closeThoughtsModal}>
                                <Text style={styles.exitButton}>↩</Text>
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>{t("editCase.distortion thoughts selection")}</Text>
                            <View style={{width: 30}} />
                        </View>
                        <View style={{flex: 1}}>
                            <MultiSelectCheckboxes
                                options={distortionsThoughtsArray}
                                headerText={t("editCase.distortion thoughts")}
                                initialSelected={initialSelectedIds}
                                onSelectionChange={setSelectedDistortions}
                                isRTL={isRTL}
                            />
                        </View>
                        <View style={styles.footerContainer}>
                            <TouchableOpacity
                                style={styles.footerButton}
                                onPress={handleDistortionsSave}>
                                <Text style={styles.footerButtonText}>{t("editCase.save")}</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>
            </SafeAreaView>
        </ImageBackground>
    );
}


