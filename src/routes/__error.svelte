<script context="module">
	export const load = ({error, status}) => ({
		props: {
			title: `${status}: ${error.message}`
		}
	})
</script>

<script lang="ts">
	import { isDark } from "../theme"
	import { goto } from "$app/navigation"

	export let title

	const goBack = () => goto("/")
</script>

<h2 class:isLight={!$isDark}>{title}</h2>
<button class="back" class:isLight={!$isDark} on:click={goBack}>Return Home</button>

<style lang="scss">
	@use "static/style/vars";

	h2 {
		color: vars.$accent;

		&.isLight { color: vars.$accent }
	}

	.back {
		font-family: jetbrains-mono, "Fira Code", monospace;;
		font-size: x-large;
		padding: .5rem;
		cursor: pointer;
		color: vars.$accent;
		border: .2rem vars.$accent outset;
		outline: none;
		background: transparent;

		&.isLight { color: vars.$accent }
	}
</style>