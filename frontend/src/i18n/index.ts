import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources, supportedLanguages } from "./resources";

const STORAGE_KEY = "bilimly.lang";

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && supportedLanguages.includes(saved as never)) return saved;

    const nav = window.navigator?.language?.slice(0, 2).toLowerCase();
    if (nav && supportedLanguages.includes(nav as never)) return nav;
  } catch {
    /* ignore */
  }
  return "en";
}

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: resources as never,
      lng: getInitialLanguage(),
      fallbackLng: "en",
      supportedLngs: supportedLanguages,
      interpolation: { escapeValue: false },
      returnNull: false,
      react: { useSuspense: false },
    });

  if (typeof document !== "undefined") {
    document.documentElement.lang = getInitialLanguage();
  }
}

export function hydrateLanguageFromStorage() {
  if (typeof window === "undefined") return;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && supportedLanguages.includes(saved as never) && saved !== i18n.language) {
      i18n.changeLanguage(saved);
      document.documentElement.lang = saved;
      return;
    }
    const nav = window.navigator?.language?.slice(0, 2).toLowerCase();
    if (nav && supportedLanguages.includes(nav as never) && nav !== i18n.language) {
      i18n.changeLanguage(nav);
      document.documentElement.lang = nav;
    }
  } catch {
    /* ignore */
  }
}

export function changeLanguage(lng: string) {
  i18n.changeLanguage(lng);
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, lng);
      document.documentElement.lang = lng;
    } catch {
      /* ignore */
    }
  }
}

export default i18n;
