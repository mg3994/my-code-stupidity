// Centralized configuration for scalability

export interface Language {
    code: string;
    name: string;
    nativeName: string;
    rtl: boolean;
}

export interface Currency {
    code: string;
    symbol: string;
    name: string;
}

export interface Country {
    code: string;
    name: string;
    defaultCurrency: string;
}

export const LANGUAGES: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', rtl: false },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', rtl: true },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', rtl: false },
];

export const CURRENCIES: Currency[] = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
    { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
];

export const COUNTRIES: Country[] = [
    { code: 'US', name: 'United States', defaultCurrency: 'USD' },
    { code: 'GB', name: 'United Kingdom', defaultCurrency: 'GBP' },
    { code: 'IN', name: 'India', defaultCurrency: 'INR' },
    { code: 'AE', name: 'United Arab Emirates', defaultCurrency: 'AED' },
    { code: 'SA', name: 'Saudi Arabia', defaultCurrency: 'SAR' },
    { code: 'PK', name: 'Pakistan', defaultCurrency: 'PKR' },
    { code: 'DE', name: 'Germany', defaultCurrency: 'EUR' },
    { code: 'FR', name: 'France', defaultCurrency: 'EUR' },
];

export const RTL_LANGUAGES = LANGUAGES.filter(lang => lang.rtl).map(lang => lang.code);

export const isRTL = (langCode: string | null | undefined): boolean => {
    return langCode ? RTL_LANGUAGES.includes(langCode) : false;
};
