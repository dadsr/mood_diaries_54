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
    toggleLanguage: () => void;
};

type LanguageProviderProps = {
    children: ReactNode;
};

const STORAGE_KEY = "preferredLanguage";
const RTL_FLAG_KEY = "rtlConfigured";

export const LanguageContext = createContext<LanguageContextType>({
    isHebrew: true,
    toggleLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
    const [isReady, setIsReady] = useState(false);
    const [isHebrew, setIsHebrew] = useState(true);

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

                // ALWAYS force RTL to be true regardless of language
                if (!I18nManager.isRTL) {
                    I18nManager.allowRTL(true);
                    I18nManager.forceRTL(true);
                }

                await AsyncStorage.setItem(RTL_FLAG_KEY, "rtl"); // Always save as RTL
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

            // ALWAYS keep RTL enabled regardless of language
            if (!I18nManager.isRTL) {
                I18nManager.allowRTL(true);
                I18nManager.forceRTL(true);
            }

            await AsyncStorage.setItem(RTL_FLAG_KEY, "rtl"); // Always save as RTL
        } catch (error) {
            Alert.alert("Error", "Failed to change language. Please try again.");
        }
    };

    if (!isReady) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ isHebrew, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
