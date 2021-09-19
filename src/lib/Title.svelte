<script lang="ts">
	import Logo from "$lib/Logo.svelte"
	import { isDark } from "$lib/data/theme"
	import BlogButton from "$lib/BlogButton.svelte"

	export let logoSize = 32
	export let fontSize = 1
	export let blogLink = false
</script>

<h1 class:isLight={!$isDark} style="font-size: {fontSize}em">
	<Logo size={logoSize} src="/favicon.svg"/>
	<a href="/">TheOnlyTails</a>
	{#if blogLink}
		<BlogButton/>
	{/if}
</h1>

<style lang="scss">
	@use "static/style/vars";

	h1 {
		margin-block: .5rem .5rem;
		color: vars.$light-color;

		@media screen and (max-width: 470px) { margin-inline-start: auto }

		&.isLight { color: vars.$dark-color }

		a {
			color: currentColor;
			font-weight: bold;
			vertical-align: middle;

			&:link, &:hover, &:active, &:visited { text-decoration: none }
		}
	}
</style>