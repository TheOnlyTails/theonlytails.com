import { writable } from "svelte/store"
import { browser } from "$app/env"

export const persistStore = (key, initial) => {
  if (browser) {
    const persist = localStorage.getItem(key) !== null ? localStorage.getItem(key) : initial
    const store = writable(persist)
    store.subscribe((value) => localStorage.setItem(key, String(value)))
    return store
  }
}
//# sourceMappingURL=persistStore.js.map