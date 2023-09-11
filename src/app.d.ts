/// <reference types="unplugin-icons/types/svelte" />

declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
  namespace svelteHTML {
    interface HTMLAttributes<T> {
      "on:copy-done"?: (e: CustomEvent<T>) => void
      "on:copy-error"?: (e: CustomEvent<T>) => void
    }
  }
}

export {}
