import {ImageBackground, View} from "react-native";
import {SafeAreaView } from 'react-native-safe-area-context';
import {Button, RadioButton, Snackbar, Switch, Text} from 'react-native-paper';
import {useTranslation} from "react-i18next";
import {useLanguage} from "../../src/hooks/LanguageContext";
import {globalStyles} from "../../src/styles/globalStyles";
import services from "../../src/services/Services";
import {JSX, useState} from "react";
import {settingsImg} from "../../assets";


export default function Settings(): JSX.Element {

    const { t } = useTranslation();
    const { isHebrew, toggleLanguage } = useLanguage();
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [selectedDiary, setSelectedDiary] = useState(1);



    const clearDiary = (diary:number) => {
        services.clearCases(diary);
        setSnackbarVisible(true);
    };



    return (
        <ImageBackground
            source={settingsImg}
            style={globalStyles.background}
            resizeMode="stretch"
        >
            <SafeAreaView style={globalStyles.container}>
                <View style={globalStyles.settingsContainer}>


                    <View style={globalStyles.languageSwitchContainer}>
                        <Text style={globalStyles.languageLabel}>
                            {t('settings.English')}
                        </Text>

                        <Switch
                            value={isHebrew}
                            onValueChange={toggleLanguage}
                            style={globalStyles.languageSwitch}
                        />

                        <Text style={globalStyles.languageLabel}>
                            {t('settings.Hebrew')}
                        </Text>
                    </View>


                     {/* Diary selection */}
                    <View style={globalStyles.selectionSection}>
                        <Text style={globalStyles.sectionTitle}>{t('settings.diaryToClear')}</Text>
                        <RadioButton.Group
                            onValueChange={newValue => setSelectedDiary(Number(newValue))}
                            value={String(selectedDiary)}
                        >
                            <View style={globalStyles.radioItem}>
                                <RadioButton value="1" />
                                <Text>{t('navigation.firstDiary')}</Text>
                            </View>
                            <View style={globalStyles.radioItem}>
                                <RadioButton value="2" />
                                <Text>{t('navigation.secondDiary')}</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    {/* Clear button */}
                    <Button
                        mode="contained"
                        onPress={() =>clearDiary(selectedDiary)}
                        style={globalStyles.button}
                        labelStyle={globalStyles.snackbarText}
                    >
                        {t('settings.clear Diary')}
                    </Button>

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
                        <Text style={globalStyles.snackbarText}>{t('settings.cases cleared')}</Text>
                    </Snackbar>


                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
