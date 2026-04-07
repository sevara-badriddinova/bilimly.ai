import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import uz from "./locales/uz.json";

// Custom language detector based on geolocation
const locationLanguageDetector = {
    name: 'locationDetector',
    lookup() {
        // Try to detect language based on timezone/location
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Uzbekistan timezones
        if (timezone.includes('Tashkent') || timezone.includes('Samarkand')) {
            return 'uz';
        }

        // Russia timezones
        if (timezone.includes('Moscow') || timezone.includes('Europe/') &&
            ['ru', 'ru-RU'].includes(navigator.language)) {
            return 'ru';
        }

        // Check browser language as fallback
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('uz')) return 'uz';
        if (browserLang.startsWith('ru')) return 'ru';
        if (browserLang.startsWith('en')) return 'en';

        return null;
    },
    cacheUserLanguage(lng: string) {
        localStorage.setItem('i18nextLng', lng);
    }
};

i18n
    .use({
        type: 'languageDetector',
        async: false,
        init: () => {},
        detect: locationLanguageDetector.lookup,
        cacheUserLanguage: locationLanguageDetector.cacheUserLanguage
    })
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ru: { translation: ru },
            uz: { translation: uz },
        },
        fallbackLng: "en",
        lng: undefined, // Let the detector choose
        interpolation: { escapeValue: false },
        detection: {
            order: ["localStorage", "locationDetector", "navigator", "htmlTag"],
            caches: ["localStorage"],
        },
        react: {
            useSuspense: false, // Disable suspense for better debugging
        },
        debug: false, // Set to true to see detailed logs
    });

export default i18n;
