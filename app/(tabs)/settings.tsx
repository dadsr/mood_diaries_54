import React, {JSX, useState } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, RadioButton, Snackbar, Switch, Text } from 'react-native-paper';
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../src/hooks/LanguageContext";
import { globalStyles, nbsp } from "../../src/styles/globalStyles";
import services from "../../src/services/Services";
import { settingsImg } from "../../assets";
import ExportButton from "@/src/components/ExportButton";

export default function Settings(): JSX.Element {
    console.log("Settings");

    const { t } = useTranslation();
    const { isHebrew, toggleLanguage, isRTL } = useLanguage();

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [selectedDiary, setSelectedDiary] = useState(1);

    const clearDiary = (diary: number) => {
        services.clearCases(diary);
        setSnackbarVisible(true);
    };

    return (
        <ImageBackground
            source={settingsImg}
            style={globalStyles.background}
            resizeMode="stretch"
        >
            <SafeAreaView style={[styles.container]}>
                <View>
                    <Text style={[styles.heading, { textAlign: isRTL ? "right" : "left" }]}>
                        {t("settings.title")}
                    </Text>

                    {/* Language selection */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { textAlign: isRTL ? "right" : "left" }]}>
                            {t('settings.language')}
                        </Text>
                        <View style={[styles.radioRow, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
                            <RadioButton
                                value="en"
                                status={!isHebrew ? "checked" : "unchecked"}
                                onPress={() => toggleLanguage()}
                            />
                            <Text style={styles.radioLabel}>{t('settings.English')}</Text>

                            <RadioButton
                                value="he"
                                status={isHebrew ? "checked" : "unchecked"}
                                onPress={() => toggleLanguage()}
                            />
                            <Text style={styles.radioLabel}>{t('settings.Hebrew')}</Text>
                        </View>
                    </View>

                    {/* Diary selection and clear */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { textAlign: isRTL ? "right" : "left" }]}>
                            {t('settings.diaryToClear')}
                        </Text>
                        <RadioButton.Group
                            onValueChange={newValue => setSelectedDiary(Number(newValue))}
                            value={String(selectedDiary)}
                        >
                            <View style={[styles.radioRow, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
                                <RadioButton value="1" />
                                <Text style={styles.radioLabel}>{t('navigation.firstDiary')}</Text>
                            </View>
                            <View style={[styles.radioRow, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
                                <RadioButton value="2" />
                                <Text style={styles.radioLabel}>{t('navigation.secondDiary')}</Text>
                            </View>
                        </RadioButton.Group>
                        <Button
                            onPress={() => clearDiary(selectedDiary)}
                            style={globalStyles.button}
                            labelStyle={globalStyles.buttonText}
                        >
                            {t('settings.clear Diary')}
                        </Button>
                    </View>

                    {/* Data/Export */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { textAlign: isRTL ? "right" : "left" }]}>{t('settings.export')}</Text>
                        <ExportButton diary={selectedDiary} />
                    </View>

                    <Snackbar
                        visible={snackbarVisible}
                        onDismiss={() => setSnackbarVisible(false)}
                        duration={3000}
                        style={globalStyles.snackbar}
                        action={{
                            label: t('settings.ok'),
                            labelStyle: globalStyles.snackbarText,
                            onPress: () => setSnackbarVisible(false),
                        }}
                    >
                        {t('settings.cases cleared')}
                    </Snackbar>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: 'center'
    },
    heading: {
        fontSize: 26,
        fontWeight: '700',
        marginTop: 25,
        marginBottom: 22,
        color: '#222'
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#444'
    },
    radioRow: {
        alignItems: 'center',
        marginBottom: 3,
    },
    radioLabel: {
        fontSize: 16,
        color: '#222',
        marginHorizontal: 5,
    },
});
