<script lang="ts">
	import { cn } from "$lib/utils.svelte";

	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

	type Props = SvelteHTMLElements["h1"] & {
		class?: string;
		children: Snippet;
	};

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<h1 class={cn("mt-2 scroll-m-20 text-4xl font-bold", className)} {...rest}>
	{@render children?.()}
</h1>
