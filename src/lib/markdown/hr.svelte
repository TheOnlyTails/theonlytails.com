<script lang="ts">
	import { cn } from "$lib/utils.svelte";

	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

	type Props = SvelteHTMLElements["hr"] & {
		class?: string;
		children: Snippet;
	};

	let { class: className = undefined, ...rest }: Props = $props();
</script>

<hr class={cn("my-4 md:my-8", className)} {...rest} />
