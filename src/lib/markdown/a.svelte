<script lang="ts">
	import { cn } from "$lib/utils.svelte";

	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

	type Props = SvelteHTMLElements["a"] & {
		href: string;
		class?: string;
		children: Snippet;
	};

	let { class: className = undefined, href, children, ...rest }: Props = $props();
	let internal = $derived(href.startsWith("/") || href.startsWith("#"));

	let rel = $derived(!internal ? "noopener noreferrer" : undefined);
	let target = $derived(!internal ? "_blank" : undefined);
</script>

<a
	{href}
	{target}
	{rel}
	class={cn("font-medium underline underline-offset-4", className)}
	{...rest}
>
	{@render children?.()}
</a>
