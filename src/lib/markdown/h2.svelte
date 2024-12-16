<script lang="ts">
	import { cn } from "$lib/utils.svelte";
	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

	type Props = SvelteHTMLElements["h2"] & {
		class?: string;
		children: Snippet;
	};

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<h2
	class={cn(
		"mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
		className,
	)}
	{...rest}
>
	{@render children?.()}
</h2>
