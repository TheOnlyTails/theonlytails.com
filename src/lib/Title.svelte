<script lang="ts">
	import Logo from "$lib/Logo.svelte"

	export let logoSize = 32
	export let fontSize = 1
</script>

<h1 style="font-size: {fontSize}em">
	<Logo size={logoSize} src="/favicon.svg"/>
	<a href="/">TheOnlyTails</a>
</h1>

<style lang="scss">
	@use "static/style/vars";

	h1 {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-block: 0;
		color: vars.$light-color;

		@media screen and (max-width: 470px) { margin-inline-start: auto }

		a {
			color: currentColor;
			font-weight: bold;

			&:link, &:hover, &:active, &:visited { text-decoration: none }
		}
	}
</style>