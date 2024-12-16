<script lang="ts">
	import CopyButton from "$lib/CopyButton.svelte";
	import { cn } from "$lib/utils.svelte";

	import type { SvelteHTMLElements } from "svelte/elements";

	type Props = SvelteHTMLElements["pre"] & {
		class?: string;
		rawCode: string;
	};

	const { rawCode, class: className = undefined, ...rest }: Props = $props();

	let codeString = $state("");
	const copyCodeToClipboard = (node: HTMLPreElement) => {
		codeString = node.innerText.trim() ?? "";
	};
</script>

<div class="relative">
	<pre
		use:copyCodeToClipboard
		class={cn(
			"flex flex-1 mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
			className,
		)}
		{...rest}>
      {@html decodeURIComponent(rawCode)}
  </pre>
	<CopyButton value={codeString} />
</div>
