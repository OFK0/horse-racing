import en from './locales/en.json';
import tr from './locales/tr.json';

const DEFAULT_LOCALE = 'en';

function loadSavedLocale() {
  const locale = localStorage.getItem('lang');

  if (!locale) return DEFAULT_LOCALE;

  return locale;
}

export default {
  locale: loadSavedLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    en,
    tr,
  },
  legacy: false,
};
