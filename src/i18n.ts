import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import he from "./locales/he.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      he: { translation: he },
    },
    detection: {
      // 👇 Customize detection order
      order: ["localStorage", "htmlTag", "navigator"],
      caches: ["localStorage"], // cache language in localStorage
    },
    lng: "he", // 👈 default language to Hebrew
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;
