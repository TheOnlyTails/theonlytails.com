<script lang="ts">
	import { cn } from "$lib/utils.svelte";
	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

	type Props = SvelteHTMLElements["table"] & {
		class?: string;
		children: Snippet;
	};
	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<div class="my-6 w-full overflow-y-auto">
	<table class={cn("w-full", className)} {...rest}>
		{@render children?.()}
	</table>
</div>
