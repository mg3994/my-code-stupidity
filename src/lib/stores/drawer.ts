import { writable } from 'svelte/store';

// Store to control the visibility of the navigation drawer
export const isDrawerOpen = writable(false);

export function toggleDrawer() {
    isDrawerOpen.update(v => !v);
}

export function closeDrawer() {
    isDrawerOpen.set(false);
}
