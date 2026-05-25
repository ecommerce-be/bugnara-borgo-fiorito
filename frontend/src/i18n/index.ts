import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import it from './locales/it.json';
import en from './locales/en.json';

/**
 * Internationalization setup.
 *
 * - Italian is the primary language (Bugnara is in Italy).
 * - English is provided for foreign visitors.
 * - The detector picks the user's browser language; falls back to Italian.
 *
 * Adding more languages later is just adding a JSON file and listing it here.
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: { translation: it },
      en: { translation: en },
    },
    fallbackLng: 'it',
    supportedLngs: ['it', 'en'],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
