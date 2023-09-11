<!-- Original source: -->
<!-- https://github.com/huntabyte/shadcn-svelte/blob/main/apps/www/src/lib/components/docs/copy-button.svelte -->
<script lang="ts">
  import { cn } from "$lib/utils"
  import Copy from "~icons/lucide/copy"
  import Check from "~icons/lucide/check"
  import { eventListenerStore } from "./eventListenerStore"

  let copied = false

  export let value = ""

  function handleCopyDone() {
    if (!document.startViewTransition) copied = true
    else document.startViewTransition(() => (copied = true))

    setTimeout(() => {
      if (!document.startViewTransition) copied = false
      else document.startViewTransition(() => (copied = false))
    }, 1000)
  }

  function handleCopyError() {
    console.log("Error copying")
  }

  type ClickToCopyActionGetterCallback = () => string
  export function clickToCopyAction<T extends HTMLElement>(
    node: T,
    text: string | ClickToCopyActionGetterCallback
  ) {
    let stop: () => void

    const destroy = () => {
      stop && stop()
    }

    const update = (text: string | ClickToCopyActionGetterCallback) => {
      destroy()

      async function handleClick() {
        try {
          await navigator.clipboard.writeText(typeof text === "function" ? text() : text)
          node.dispatchEvent(new CustomEvent("copy-done"))
        } catch (error) {
          node.dispatchEvent(new CustomEvent("copy-error", { detail: { error } }))
        }
      }

      ;({ stop } = eventListenerStore("click", handleClick, node))
    }

    update(text)

    return {
      update,
      destroy,
    }
  }
</script>

<button
  class={cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 absolute right-4 top-4"
  )}
  use:clickToCopyAction={value}
  on:copy-done={handleCopyDone}
  on:copy-error={handleCopyError}
  {...$$restProps}
>
  <span class="sr-only">Copy</span>
  {#if copied}
    <Check class="h-3 w-3" />
  {:else}
    <Copy class="h-3 w-3" />
  {/if}
</button>
