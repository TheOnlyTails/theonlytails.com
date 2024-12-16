<script lang="ts">
	import { cn } from "$lib/utils.svelte";

	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

	type Props = SvelteHTMLElements["tlir"] & {
		class?: string;
		children: Snippet;
	};

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<li class={cn("mt-2", className)} {...rest}>
	{@render children?.()}
</li>
