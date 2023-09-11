<script lang="ts">
  import CopyButton from "$lib/CopyButton.svelte"
  import { cn } from "$lib/utils"

  let className: string | undefined | null = undefined
  export { className as class }

  let codeString: string

  const copyCodeToClipboard = (node: HTMLPreElement) => {
    codeString = node.innerText.trim() ?? ""
  }
</script>

<pre
  use:copyCodeToClipboard
  class={cn(
    "relative flex mb-4 mt-2 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
    className
  )}
  {...$$restProps}>
	<slot />
  <CopyButton value={codeString} class={cn("absolute right-4 top-4 pre-copy-btn")} />
</pre>
