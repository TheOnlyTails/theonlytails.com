<script lang="ts">
	import { cn } from "$lib/utils.svelte";

	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

	type Props = SvelteHTMLElements["img"] & {
		class?: string;
		children: Snippet;
	};
	let { class: className = undefined, src = undefined, alt = undefined, ...rest }: Props = $props();
</script>

<img {src} {alt} class={cn("rounded-md", className)} {...rest} />
