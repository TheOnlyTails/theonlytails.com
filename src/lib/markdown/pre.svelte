<script lang="ts">
  import CopyButton from "$lib/CopyButton.svelte"
  import { cn } from "$lib/utils"

  export let rawCode: string
  let className: string | undefined | null = undefined
  export { className as class }

  let codeString: string

  const copyCodeToClipboard = (node: HTMLPreElement) => {
    codeString = node.innerText.trim() ?? ""
  }
</script>

<div class="relative">
  <pre
    use:copyCodeToClipboard
    class={cn(
      "flex flex-1 mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
      className
    )}
    {...$$restProps}>
      {@html decodeURIComponent(rawCode)}
  </pre>
  <CopyButton value={codeString} />
</div>
