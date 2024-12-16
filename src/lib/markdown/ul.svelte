<script lang="ts">
	import { cn } from "$lib/utils.svelte";
	import type { SvelteHTMLElements } from "svelte/elements";
	import type { Snippet } from "svelte";

	type Props = SvelteHTMLElements["ul"] & {
		class?: string;
		children: Snippet;
	};

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<ul class={cn("my-6 ml-6 list-disc", className)} {...rest}>
	{@render children()}
</ul>
