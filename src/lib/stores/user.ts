import { writable } from 'svelte/store';
import { fetchUserLocation, type GeoData } from '../services/geo';

interface UserPreferences {
    country: string;
    currency: string;
}

interface UserState {
    detectedLocation: GeoData | null;
    preferences: UserPreferences;
    isLoading: boolean;
}

const STORAGE_KEY = 'lwm_user_prefs';

function createUserStore() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initialState: UserState = stored ? JSON.parse(stored) : {
        detectedLocation: null,
        preferences: {
            country: '',
            currency: 'USD',
        },
        isLoading: false
    };

    const { subscribe, update } = writable<UserState>(initialState);

    return {
        subscribe,
        init: async () => {
            if (initialState.detectedLocation) return;

            update(s => ({ ...s, isLoading: true }));
            const location = await fetchUserLocation();

            update(s => {
                const currentCountry = s.preferences?.country || '';
                const currentCurrency = s.preferences?.currency || 'USD';

                const newState = {
                    ...s,
                    detectedLocation: location,
                    preferences: {
                        country: currentCountry || (location && location.country_code ? location.country_code : ''),
                        currency: currentCurrency || (location && location.currency ? location.currency : 'USD'),
                    },
                    isLoading: false
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
                return newState;
            });
        },
        setCountry: (country: string) => {
            update(s => {
                const newState = { ...s, preferences: { ...s.preferences, country } };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
                return newState;
            });
        },
        setCurrency: (currency: string) => {
            update(s => {
                const newState = { ...s, preferences: { ...s.preferences, currency } };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
                return newState;
            });
        }
    };
}

export const user = createUserStore();
