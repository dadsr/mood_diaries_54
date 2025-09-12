import '../src/i18n';
import {LanguageProvider} from "../src/hooks/LanguageContext";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Slot } from "expo-router";
import {I18nManager} from "react-native";


export default function RootLayout() {
    // ALWAYS force RTL to be true regardless of language
    if (!I18nManager.isRTL) {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
    }
    return (
        <SafeAreaProvider>
            <LanguageProvider>
                <Slot screenOptions={{ headerShown: false }} />
            </LanguageProvider>
        </SafeAreaProvider>
    );
}
