<script lang="ts">
	import { cn } from "$lib/utils.svelte";

	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

	type Props = SvelteHTMLElements["ol"] & {
		class?: string;
		children: Snippet;
	};

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<ol class={cn("my-6 ml-6 list-decimal", className)} {...rest}>
	{@render children?.()}
</ol>
