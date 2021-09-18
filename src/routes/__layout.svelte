<script lang="ts">
	import { isDark } from "$lib/data/theme"
	import ThemeSwitch from "$lib/ThemeSwitch.svelte"
	import Title from "$lib/Title.svelte"
</script>

<svelte:head>
	<title>TheOnlyTails &bullet; Personal Website</title>
	<meta content="TheOnlyTails" name="og:title">
	<meta content="TheOnlyTails • Personal Website" name="description">
	<meta content="TheOnlyTails • Personal Website" name="og:description">
	<meta content="https://www.theonlytails.com/icons/logo.png" name="og:image">
	<meta content="website" name="og:type"/>
	<meta content="https://www.theonlytails.com" name="og:url">

	<meta content="TheOnlyTails • Personal Website" name="twitter:title"/>
	<meta content="https://www.theonlytails.com/icons/logo.png" name="twitter:image"/>
	<meta content="@the_only_tails" name="twitter:creator"/>
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
		@include mixins.page;

		font-size: 1.1rem;
		transition: all 0.5s ease;
	}

	header.title {
		display: flex;
		align-items: center;
		gap: 1rem;
		font: {
			size: 2em;
			weight: bold;
		}
	}

	main { @include mixins.center(1.4rem) }
</style>