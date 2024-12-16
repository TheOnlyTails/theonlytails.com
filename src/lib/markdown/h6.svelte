<script lang="ts">
	import { cn } from "$lib/utils.svelte";

	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

	type Props = SvelteHTMLElements["h6"] & {
		class?: string;
		children: Snippet;
	};
	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<h6 class={cn("mt-8 scroll-m-20 text-base font-semibold tracking-tight", className)} {...rest}>
	{@render children?.()}
</h6>
