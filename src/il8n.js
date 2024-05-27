import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../src/assets/locales/en/translation.json';
import tn from '../src/assets/locales/tn/translation.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            tn: { translation: tn }
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;