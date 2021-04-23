import { writable } from "svelte/store";

export const persistStore = (key: string, initial: boolean) => {
    const persist = (localStorage.getItem(key) === "true");
    const store = writable(persist ?? initial)
    store.subscribe(value => localStorage.setItem(key, String(value)))

    return store
}