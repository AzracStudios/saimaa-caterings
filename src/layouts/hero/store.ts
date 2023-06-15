import { writable } from 'svelte/store';
export const bannerIndex = writable<number>(0);
export const bannerImages = writable<StrapiBanner[]>([]);
export const intervalId = writable<number>();
export const triggerInterval = writable<boolean>(false);
