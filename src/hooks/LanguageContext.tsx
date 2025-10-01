import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Alert, I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import i18n from "i18next";

type LanguageContextType = {
    isHebrew: boolean;
    isRTL: boolean;
    toggleLanguage: () => void;
};

type LanguageProviderProps = {
    children: ReactNode;
};

const STORAGE_KEY = "preferredLanguage";
const RTL_FLAG_KEY = "rtlConfigured";

export const LanguageContext = createContext<LanguageContextType>({
    isHebrew: true,
    isRTL: true,
    toggleLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [isReady, setIsReady] = useState(false);
    const [isHebrew, setIsHebrew] = useState(true);

    const isRTL = isHebrew;

    useEffect(() => {
        const initializeLanguage = async () => {
            try {
                const savedLang = await AsyncStorage.getItem(STORAGE_KEY);
                const selectedLang = savedLang ?? "he";
                if (!savedLang) {
                    await AsyncStorage.setItem(STORAGE_KEY, selectedLang);
                }
                await i18n.changeLanguage(selectedLang);
                const isHebrewLang = selectedLang.startsWith("he");
                setIsHebrew(isHebrewLang);

                if (!I18nManager.isRTL) {
                    I18nManager.allowRTL(true);
                    I18nManager.forceRTL(true);
                    await AsyncStorage.setItem(RTL_FLAG_KEY, "rtl");
                }
                setIsReady(true);

            } catch (error) {
                console.error("❌ Error initializing language or RTL:", error);
                setIsReady(true);
            }
        };
        initializeLanguage();
    }, []);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    const toggleLanguage = async () => {
        try {
            const newLang = isHebrew ? "en" : "he";
            const newIsHebrew = !isHebrew;
            await i18n.changeLanguage(newLang);
            await AsyncStorage.setItem(STORAGE_KEY, newLang);
            setIsHebrew(newIsHebrew);

            if (!I18nManager.isRTL) {
                I18nManager.allowRTL(true);
                I18nManager.forceRTL(true);
                await AsyncStorage.setItem(RTL_FLAG_KEY, "rtl");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to change language. Please try again.");
        }
    };

    if (!isReady) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ isHebrew, isRTL, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
