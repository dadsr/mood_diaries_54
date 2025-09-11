import '../src/i18n';
import {LanguageProvider} from "../src/hooks/LanguageContext";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { Slot } from "expo-router";


export default function RootLayout() {

    return (
        <SafeAreaProvider>
            <LanguageProvider>
                <Slot screenOptions={{ headerShown: false }} />
            </LanguageProvider>
        </SafeAreaProvider>
    );
}
