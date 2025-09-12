import React, {JSX, useEffect, useState} from "react";
import {
    Animated,
    I18nManager,
    ImageBackground,
    Modal,
    ScrollView as DefaultScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';

import {globalStyles, nbsp} from "../src/styles/globalStyles";
import {router, useLocalSearchParams} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {CaseFormValues} from "../src/models/Types";
import {Controller, useForm} from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

import {backgroundImg, settingsImg} from "../assets";
import {useTranslation} from "react-i18next";
import {Emotion} from "../src/models/Emotion";
import {DistortionThought} from "../src/models/DistortionThought";
import {Case} from "../src/models/Case";
import services from "../src/services/Services";
import MultiSelectCheckboxes from "../src/components/multiSelectCheckboxes";
import {DistortionsThoughtKey, distortionsThoughtsArray} from "../src/models/consts/DistortionsThoughtsConst";
import {EmotionsSelector} from "../src/components/emotionsSelector";



export default function EditCase(): JSX.Element {

    console.log("Edit Case ");
    const {t} = useTranslation();

    const insets = useSafeAreaInsets();
    const diary: number = Number(useLocalSearchParams().diary);
    const id: number = Number(useLocalSearchParams().id);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(
        false);
    const [showPicker, setShowPicker] = useState(false);
    const [isEmotionsModalVisible, setIsEmotionsModalVisible] = useState(false);
    const [isThoughtsModalVisible, setIsThoughtsModalVisible] = useState(false);

    const [selectedDistortions, setSelectedDistortions] = useState<string[]>([]);



    const {control, handleSubmit, setValue, watch, formState: {errors}} = useForm<CaseFormValues>({
        defaultValues: {
            id: 0,
            caseName: '',
            caseDate: new Date(),
            thought: '',
            emotions: [] as Emotion[],
            behavior: '',
            symptoms: '',
            distortions: [] as DistortionThought[],
            counterThoughts:'',
        }
    });

    useEffect(() => {
        if (id > 0) {
            (async () => {
                const myCase: Case | null = await services.getCase(diary,id);
                if (myCase) {
                    setValue('id', myCase.id);
                    setValue('caseName', myCase.caseName!);
                    setValue('caseDate', myCase.caseDate!);
                    setValue('thought', myCase.thought!);
                    setValue('behavior', myCase.behavior!);
                    setValue('symptoms', myCase.symptoms!);
                    setValue('emotions', myCase.emotions.map((emotion:Emotion) => new Emotion(emotion.getEmotion, emotion.getIntensity)));
                    setValue('behavior', myCase.behavior!);
                    setValue('symptoms', myCase.symptoms!);
                    setValue('distortions', myCase.distortions.map((thought: DistortionThought) => new DistortionThought(thought.getDistortion)));
                    setValue('counterThoughts', myCase.counterThoughts!);
                }
            })();
        }
    }, [id,setValue]);


    const openEmotionsModal = () => setIsEmotionsModalVisible(true);
    const closeEmotionsModal = () => setIsEmotionsModalVisible(false);

    const openThoughtsModal = () =>  setIsThoughtsModalVisible(true);
    const closeThoughtsModal = () =>  setIsThoughtsModalVisible(false);

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
        console.log("submitForm diary ",diary);
        setIsSubmitting(true);

        const caseInstance = new Case();
        caseInstance.id = data.id;
        caseInstance.caseName = data.caseName;
        caseInstance.caseDate = data.caseDate;
        caseInstance.thought = data.thought;
        caseInstance.emotions = data.emotions.map((emotion:Emotion) => new Emotion(emotion.getEmotion, emotion.getIntensity));
        caseInstance.behavior = data.behavior;
        caseInstance.symptoms = data.symptoms;
        caseInstance.distortions = data.distortions.map((thought:DistortionThought) => new DistortionThought(thought.getDistortion));
        caseInstance.counterThoughts = data.counterThoughts;

        try {
            if (caseInstance.id > 0) {
                await services.updateCase(diary, caseInstance);
            } else {
                await services.addCase(diary, caseInstance);
            }
            if (diary === 1) {
                router.replace('/firstDiary');
            } else if (diary === 2) {
                router.replace('/secondDiary');
            } else {
                router.back();
            }
        } catch (error) {
            console.error("Error saving case:", error);
        } finally {
            setIsSubmitting(false);
        }
    };




    return (

        <SafeAreaView style={[globalStyles.container, { paddingTop: insets.top }]}>
            <ImageBackground
                source={backgroundImg}
                style={globalStyles.background}
                resizeMode="stretch"
            >
                <DefaultScrollView contentContainerStyle={styles.scrollContainer}>

                    <Text style = {globalStyles.heading}>{t("editCase.editing event")}:</Text>

                    {/* description */}
                    <Text style={styles.label}>{t("editCase.eventName")}{':' + nbsp}</Text>
                    <Controller
                        control={control}
                        name="caseName"
                        rules={{ required: t("editCase.caseNameRequired") || "Case name is required" }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.caseName && (
                        <Text style={styles.error}>{errors.caseName.message}</Text>
                    )}

                    {/* Date Picker Field */}
                    <Text style={styles.label}>{t("editCase.date")}{':' + nbsp}</Text>
                    <Controller
                        control={control}
                        name="caseDate"
                        render={({ field: { onChange, value } }) => (
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
                                        onChange={(event, selectedDate) => {
                                            setShowPicker(false);
                                            if (selectedDate) {
                                                onChange(selectedDate);
                                            }
                                        }}
                                    />
                                )}
                            </>
                        )}
                    />

                    {/* Thought Field */}
                    <Text style={styles.label}>{t("editCase.thought")}{':' + nbsp}</Text>
                    <Controller
                        control={control}
                        name="thought"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, styles.textarea]}
                                value={value}
                                onChangeText={onChange}
                                multiline={true}
                                numberOfLines={4}
                            />
                        )}
                    />

                    {/* Emotions Selector */}
                    <Text style={styles.label}>{t("editCase.emotions")}{':' + nbsp}</Text>

                    <ImageBackground
                        source={settingsImg}
                        style={globalStyles.background}
                        resizeMode="cover"
                    >
                        <TouchableOpacity style={globalStyles.modelOpener} onPress={openEmotionsModal}>
                            <Text style={styles.emotionsTitle}>{t("editCase.emotions selection")}</Text>
                        </TouchableOpacity>
                    </ImageBackground>




                        <Modal
                            visible={isEmotionsModalVisible}
                            animationType="fade"
                            presentationStyle="pageSheet"
                            onRequestClose={closeEmotionsModal}
                        >
                            <SafeAreaView style={styles.modalContainer}>
                                <View style={styles.modalHeader}>
                                    {/*exit*/}
                                    <TouchableOpacity onPress={closeEmotionsModal}>
                                        <Text style={styles.exitButton}>↩</Text>
                                    </TouchableOpacity>

                                    {/*title*/}
                                    <Text style={styles.modalTitle}>
                                        {t("editCase.emotions selection")}
                                    </Text>
                                    <View style={{ width: 30 }} />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <EmotionsSelector diary={diary} control={control} name="emotions" />
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




                    {/* behavior 1st diary */}
                    {diary === 1 && (
                        <>
                            <Text style={styles.label}>{t("editCase.behavior")}{':' + nbsp}</Text>
                            <Controller
                                control={control}
                                name="behavior"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={[styles.input, styles.textarea]}
                                        value={value}
                                        onChangeText={onChange}
                                        multiline={true}
                                        numberOfLines={3}
                                    />
                                )}
                            />
                        </>
                    )}

                    {/* Symptoms Field 1st diary */}
                    {diary === 1 && (
                        <>
                            <Text style={styles.label}>{t("editCase.symptoms")}{':' + nbsp}</Text>
                            <Controller
                                control={control}
                                name="symptoms"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={[styles.input, styles.textarea]}
                                        value={value}
                                        onChangeText={onChange}
                                        multiline={true}
                                        numberOfLines={3}
                                    />
                                )}
                            />
                        </>
                    )}

                    {diary === 2 &&(
                        <>
                            {/* Distortion thoughts Field 2st diary */}
                            <Text style={styles.label}>{t("editCase.distortion thoughts")}{':' + nbsp}</Text>

                            <ImageBackground
                                source={settingsImg}
                                style={globalStyles.background}
                                resizeMode="cover"
                            >
                                <TouchableOpacity style={globalStyles.modelOpener} onPress={openThoughtsModal}>
                                    <Text style={styles.emotionsTitle}>{t("editCase.distortion thoughts")}</Text>
                                </TouchableOpacity>
                            </ImageBackground>


                            <Modal
                                visible={isThoughtsModalVisible}
                                animationType="slide"
                                onRequestClose={closeThoughtsModal}
                            >
                                <SafeAreaView style={styles.modalContainer}>
                                    <View style={styles.modalHeader}>
                                        {/*exit*/}
                                        <TouchableOpacity onPress={closeThoughtsModal}>
                                            <Text style={styles.exitButton}>↩</Text>
                                        </TouchableOpacity>

                                        {/*title*/}
                                        <Text style={styles.modalTitle}>
                                            {t("editCase.distortion thoughts selection")}
                                        </Text>
                                        <View style={{ width: 30 }} />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <MultiSelectCheckboxes
                                            options={distortionsThoughtsArray}
                                            headerText={t("editCase.distortion thoughts")}
                                            initialSelected={initialSelectedIds}
                                            onSelectionChange={setSelectedDistortions}
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



                            {/*  Counter thoughts Field 2st diary */}

                            <Text style={styles.label} >{t("editCase.counter thoughts")}{':' + nbsp}</Text>

                            <Controller
                                control={control}
                                name="counterThoughts"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={[styles.input, styles.textarea]}
                                        value={value}
                                        onChangeText={onChange}
                                        multiline={true}
                                        numberOfLines={3}
                                    />
                                )}
                            />

                        </>

                    )}


                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                        onPress={handleSubmit(submitForm)}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.submitButtonText}>
                            {isSubmitting ? t("editCase.saving") || "Saving..." : t("editCase.save")}
                        </Text>
                    </TouchableOpacity>

                </DefaultScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
        flexGrow: 1,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#333',
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
    },

    textarea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },

    error: {
        color: '#ff4444',
        fontSize: 14,
        marginBottom: 8,
        marginTop: 4,
    },

    dateText: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
        color: '#333',
    },

    submitButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 32,
    },

    submitButtonDisabled: {
        backgroundColor: '#ccc',
    },

    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    emotionsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
        color: '#333',
    },

    buttonContainer: {
        alignItems: 'center',
    },

    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor:'rgba(76,114,229,0.61)',

    },

    modalTitle: {
        fontSize: 22,
        padding: 5,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    exitButton: {
        fontSize: 24,
        color: '#666',
        paddingHorizontal: 10
    },

    contentContainer: {
        flex: 1,
    },

    footerContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
    },

    footerButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },

    footerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

});

