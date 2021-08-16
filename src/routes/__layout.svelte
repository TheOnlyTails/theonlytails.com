<script lang="ts">
	import { isDark } from "$lib/data/theme"
	import ThemeSwitch from "$lib/ThemeSwitch.svelte"
	import Title from "$lib/Title.svelte"
</script>

<svelte:head>
	<title>TheOnlyTails</title>
	<meta content="TheOnlyTails" name="og:title">
	<meta content="TheOnlyTails' website" name="description">
	<meta content="TheOnlyTails' website" name="og:description">
	<meta content="https://www.theonlytails.com/icons/favicon.png" name="og:image">
	<meta content="https://www.theonlytails.com" name="og:url">

	<link href="/favicon.svg" rel="icon">
	<link href="/style/style.css" rel="stylesheet">
	<link href="/style/links.css" rel="stylesheet">
	<link href="/fonts/jb-mono.css" rel="stylesheet">
</svelte:head>

<div class:isLight="{!$isDark}" id="page">
	<header class="header title">
		<Title/>
	</header>

	<main>
		<slot/>
	</main>

	<ThemeSwitch/>
</div>

<style lang="scss">
	@use "static/style/vars";
	@use "static/style/mixins";

	#page {
		@include mixins.center;
		font-size: 1.1rem;
		min-height: 100vh;
		transition: all 0.5s ease;
		color: vars.$light-color;

		background: vars.$dark-color;

		&.isLight {
			color: vars.$dark-color;
			background: vars.$light-color;
		}
	}

	header.title {
		font: {
			size: 2em;
			weight: bold;
		}
	}

	main { @include mixins.center(1.4rem) }
</style>