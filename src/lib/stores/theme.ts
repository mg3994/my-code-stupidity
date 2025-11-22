import { writable } from 'svelte/store';

export type ThemeMode = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'lwm_theme_prefs';

function createThemeStore() {
    // Load from storage
    const stored = localStorage.getItem(STORAGE_KEY);
    const initialState = stored ? JSON.parse(stored) : {
        mode: 'system' as ThemeMode,
        primaryHue: 250
    };

    const { subscribe, set, update } = writable(initialState);

    const save = (state: any) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return state;
    };

    return {
        subscribe,
        setMode: (mode: ThemeMode) => update(s => save({ ...s, mode })),
        setHue: (hue: number) => update(s => save({ ...s, primaryHue: hue })),
        reset: () => {
            const defaultState = { mode: 'system', primaryHue: 250 };
            set(save(defaultState));
        }
    };
}

export const theme = createThemeStore();
