<script lang="ts">
	import { isDark } from "../theme"
	import Logo from "../components/Logo.svelte"
	import ThemeSwitch from "../components/ThemeSwitch.svelte"
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
		<Logo src="/favicon.svg"/>
		<a class="title" class:isLight="{!$isDark}" href="/">TheOnlyTails</a>
	</header>

	<main>
		<slot>
		</slot>
	</main>

	<ThemeSwitch/>
</div>

<style lang="scss">
	@use "static/style/vars";
	@use "static/style/mixins";

	#page {
		@include mixins.center;
		font-size: 1.1rem;
		max-width: 50%;
		min-height: 100vh;
		transition: all 0.5s ease;
		color: vars.$light-color;
		background: vars.$dark-color;

		min: {
			width: 100vw;
		}

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
		margin-top: .75rem;
		place-content: center start;

		a {
			vertical-align: middle;
			color: vars.$light-color;

			&:link, &:hover, &:active, &:visited {
				text-decoration: none;
			}

			&.isLight {
				color: vars.$dark-color
			}
		}
	}

	main { @include mixins.center }
</style>