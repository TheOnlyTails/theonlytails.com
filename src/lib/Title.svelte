<script lang="ts">
	import Logo from "$lib/Logo.svelte"
	import { isDark } from "$lib/data/theme"

	export let logoSize = 32
	export let fontSize = 1
</script>

<Logo size={logoSize} src="/favicon.svg"/>
<a class="title" class:isLight={!$isDark} href="/" style="font-size: {fontSize}em">TheOnlyTails</a>

<style lang="scss">
	@use "static/style/vars";

	.title {
		font: {
			weight: bold;
		}
		vertical-align: middle;
		color: vars.$light-color;

		&:link, &:hover, &:active, &:visited {
			text-decoration: none;
		}

		&.isLight {
			color: vars.$dark-color
		}
	}
</style>