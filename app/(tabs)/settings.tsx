import React, {JSX, useMemo, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ImageBackground,ScrollView as DefaultScrollView, View} from "react-native";
import {Button, RadioButton, Text} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import {useLanguage} from "../../src/hooks/LanguageContext";
import {globalStyles} from "../../src/styles/globalStyles";
import services from "../../src/services/Services";
import {settingsImg} from "../../assets";
import ExportButton from "@/src/components/ExportButton";
import {createSettingsStyles} from "@/src/styles/settingStyles";
import CustomToast from "@/src/components/CustomToast";

export default function Settings(): JSX.Element {
    console.log("Settings");
    const { t } = useTranslation();
    const { isHebrew, toggleLanguage, isRTL } = useLanguage();
    const styles = useMemo(() => createSettingsStyles(isRTL), [isRTL]);

    const [cleaningDiary, setCleaningDiary] = useState(1);
    const [exportingDiary, setExportingDiary] = useState(1);

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');


    const showSuccess = (msg:string) => {
        setToastMessage(msg);
        setToastType('success');
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2500);
    };
    const showError =  (msg:string) => {
        setToastMessage(msg);
        setToastType('error');
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    const clearDiary = (diary: number) => {
        services.clearCases(diary)
            .then(() => {
                showSuccess(t('settings.cases cleared'));
            }).catch(() => {
            showError(t('settings.cases clear failed'));
        })
    };

    return (
        <ImageBackground
            source={settingsImg}
            style={globalStyles.background}
            resizeMode="stretch"
        >
            <SafeAreaView style={[styles.container]}>
                <DefaultScrollView style={styles.scrollView}>

                    <Text style={styles.heading}>
                        {t("settings.title")}
                    </Text>

                    {/* Language selection */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {t('settings.language')}
                        </Text>
                        <RadioButton.Group
                            onValueChange={() => toggleLanguage()}
                            value={isHebrew ? "he" : "en"}
                        >
                            <View style={styles.radioRow}>
                                <RadioButton
                                    value="en"
                                    status={!isHebrew ? "checked" : "unchecked"}
                                    onPress={() => !isHebrew && toggleLanguage()}
                                />
                                <Text style={styles.radioLabel}>{t('settings.English')}</Text>
                            </View>
                            <View style={styles.radioRow}>
                                <RadioButton
                                    value="he"
                                    status={isHebrew ? "checked" : "unchecked"}
                                    onPress={() => isHebrew && toggleLanguage()}
                                />
                                <Text style={styles.radioLabel}>{t('settings.Hebrew')}</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    {/* Diary selection and clear */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('settings.diaryToClear')}</Text>
                        <RadioButton.Group
                            onValueChange={newValue => setCleaningDiary(Number(newValue))}
                            value={String(cleaningDiary)}
                        >
                            <View style={styles.radioRow}>
                                <RadioButton value="1" status={cleaningDiary === 1 ? "checked" : "unchecked"} />
                                <Text style={styles.radioLabel}>{t('navigation.firstDiary')}</Text>
                            </View>
                            <View style={styles.radioRow}>
                                <RadioButton value="2" status={cleaningDiary === 2 ? "checked" : "unchecked"} />
                                <Text style={styles.radioLabel}>{t('navigation.secondDiary')}</Text>
                            </View>
                        </RadioButton.Group>
                        <Button
                            onPress={() => clearDiary(cleaningDiary)}
                            style={globalStyles.button}
                            labelStyle={globalStyles.buttonText}
                        >
                            {t('settings.clear Diary')}
                        </Button>
                    </View>

                    {/* Data/Export */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('settings.export')}</Text>
                        <RadioButton.Group
                            onValueChange={newValue => setExportingDiary(Number(newValue))}
                            value={String(exportingDiary)}
                        >
                            <View style={styles.radioRow}>
                                <RadioButton value="1" status={exportingDiary === 1 ? "checked" : "unchecked"} />
                                <Text style={styles.radioLabel}>{t('navigation.firstDiary')}</Text>
                            </View>
                            <View style={styles.radioRow}>
                                <RadioButton value="2" status={exportingDiary === 2 ? "checked" : "unchecked"} />
                                <Text style={styles.radioLabel}>{t('navigation.secondDiary')}</Text>
                            </View>
                        </RadioButton.Group>
                        <ExportButton diary={exportingDiary} showSuccess={showSuccess} showError={showError} />
                    </View>

                </DefaultScrollView>
                {/* Diary clear snackbar */}
                <CustomToast
                    visible={toastVisible}
                    message={toastMessage}
                    type={toastType}
                    onDismiss={() => setToastVisible(false)}
                />

            </SafeAreaView>
        </ImageBackground>
    );
}
