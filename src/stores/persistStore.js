import { writable } from "svelte/store";
export const persistStore = (key, initial) => {
    const persist = localStorage.getItem(key) !== null ? localStorage.getItem(key) === "true" : initial;
    const store = writable(persist);
    store.subscribe(value => localStorage.setItem(key, String(value)));
    return store;
};
//# sourceMappingURL=persistStore.js.map