import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en.json';
import translationHe from './locales/he.json';
import * as Localization from 'expo-localization';

const resources = {
    en: { translation: translationEn },
    he: { translation: translationHe },
};


const deviceLocale = Localization.getLocales && Localization.getLocales().length > 0
  ? Localization.getLocales()[0].languageTag
  : 'he';


console.log("📱 Device locale detected:", deviceLocale);

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: deviceLocale,
        fallbackLng: 'he',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        returnEmptyString: false,
        react: {
            useSuspense: false,
        },
    });

console.log("🌐 i18n initialized with fallback language:", i18n.language);

export default i18n;
