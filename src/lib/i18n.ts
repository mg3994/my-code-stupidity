import { register, init, getLocaleFromNavigator, locale } from 'svelte-i18n';
import { isRTL } from './config';

register('en', () => import('../locales/en.json'));
register('ar', () => import('../locales/ar.json'));
register('ur', () => import('../locales/ur.json'));
register('hi', () => import('../locales/hi.json'));

const STORAGE_KEY = 'lwm_locale';

// Initialize
const savedLocale = localStorage.getItem(STORAGE_KEY);
const initialLocale = savedLocale || getLocaleFromNavigator();

init({
    fallbackLocale: 'en',
    initialLocale: initialLocale,
});

// Persist changes
locale.subscribe(val => {
    if (val) localStorage.setItem(STORAGE_KEY, val);
});

export { isRTL };
