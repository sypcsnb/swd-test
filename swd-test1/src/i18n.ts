import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../public/locales/en/translation.json";
import translationTH from "../public/locales/th/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  th: {
    translation: translationTH,
  },
};

const language: any = localStorage.getItem("I18N_LANGUAGE");
if (!language) {
  localStorage.setItem("I18N_LANGUAGE", "en");
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en", // use en if detected lng is not available
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
