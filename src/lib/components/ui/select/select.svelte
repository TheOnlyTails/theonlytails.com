<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";

	type $$Props = SelectPrimitive.Props;

	interface Props {
		[key: string]: any;
	}

	let {
		selected = $bindable(undefined),
		open = $bindable(undefined),
		children,
		...rest
	}: Props = $props();
</script>

<SelectPrimitive.Root bind:selected bind:open {...rest}>
	{@render children?.()}
</SelectPrimitive.Root>
