<!-- Original source: -->
<!-- https://github.com/huntabyte/shadcn-svelte/blob/main/apps/www/src/lib/components/docs/copy-button.svelte -->
<script lang="ts">
	import { cn } from "$lib/utils.svelte";
	import Copy from "~icons/lucide/copy";
	import Check from "~icons/lucide/check";
	import { browser } from "$app/environment";

	interface Props {
		value: string;
		copied?: boolean;
	}

	let { value, copied = $bindable(), ...rest }: Props = $props();

	function copyCode() {
		if (!browser) return;
		navigator.clipboard.writeText(value);
		copied = true;

		setTimeout(() => {
			copied = false;
		}, 1000);
	}
</script>

<button
	class={cn(
		"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10 size-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 absolute right-4 top-4",
	)}
	onclick={copyCode}
	{...rest}
>
	<span class="sr-only">Copy</span>
	{#if copied}
		<Check class="size-3" />
	{:else}
		<Copy class="size-3" />
	{/if}
</button>
