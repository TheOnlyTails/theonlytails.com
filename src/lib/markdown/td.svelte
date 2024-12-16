<script lang="ts">
	import { cn } from "$lib/utils.svelte";
	import type { Snippet } from "svelte";
	import type { SvelteHTMLElements } from "svelte/elements";

	type Props = SvelteHTMLElements["td"] & {
		class?: string;
		children: Snippet;
	};
	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<td
	class={cn(
		"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
		className,
	)}
	{...rest}
>
	{@render children?.()}
</td>
