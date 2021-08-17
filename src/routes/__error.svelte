<script context="module">
	export const load = ({error, status}) => ({
		props: {
			title: `${status}: ${error.message}`
		}
	})
</script>

<script lang="ts">
	import { isDark } from "$lib/data/theme"
	import { goto } from "$app/navigation"

	export let title

	const goBack = () => goto("/")
</script>

<h2 class:isLight={!$isDark}>{title}</h2>
<button class="back" class:isLight={!$isDark} on:click={goBack}>Return Home</button>

<style lang="scss">
	@use "static/style/vars";
	@use "static/style/mixins";

	h2 {
		color: vars.$accent;

		&.isLight { color: vars.$accent }
	}

	.back {
		padding: .5rem;
		border: .2rem vars.$accent outset;
		outline: none;
		background: transparent;
		font-family: jetbrains-mono, "Fira Code", monospace;;
		font-size: x-large;
		color: vars.$accent;
		text-align: center;
		cursor: pointer;

		&.isLight { color: vars.$accent }
	}
</style>