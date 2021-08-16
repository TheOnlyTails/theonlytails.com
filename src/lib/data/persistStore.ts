import { writable } from "svelte/store"
import { browser } from "$app/env"

export const persistStore = (key: string, initial: boolean) => {
  if (browser) {
    const persist =
      localStorage.getItem(key) !== null ? localStorage.getItem(key) === "true" : initial
    const store = writable(persist)
    store.subscribe((value) => localStorage.setItem(key, String(value)))

    return store
  }
}