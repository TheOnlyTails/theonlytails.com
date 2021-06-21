<script lang="ts">
	import { isDark, switchTheme } from "../stores/theme"
	import Logo from "../components/Logo.svelte"
</script>

<svelte:head>
	<title>TheOnlyTails</title>
	<meta content="TheOnlyTails" name="og:title"/>
	<meta content="TheOnlyTails' website" name="description"/>
	<meta content="TheOnlyTails' website" name="og:description"/>
	<meta content="https://www.theonlytails.com/icons/favicon.png" name="og:image"/>
	<meta content="https://www.theonlytails.com" name="og:url"/>

	<link href="/favicon.svg" rel="icon"/>
	<link href="/style/style.css" rel="stylesheet"/>
	<link href="/style/links.css" rel="stylesheet"/>
	<link href="/fonts/jb-mono.css" rel="stylesheet"/>
</svelte:head>

<div class="text-2xl min-h-screen min-w- bg-gray-600 " class:isLight={!$isDark} id="page">
	<header class="header title">
		<Logo src="/favicon.svg"/>
		<a class="title" class:isLight={!$isDark} href="/">TheOnlyTails</a>
	</header>

	<main>
		<slot/>
	</main>

	<button
			aria-checked="true"
			aria-labelledby="theme-switch-label"
			id="theme-switch"
			on:click={switchTheme}
			role="switch"
	>
		<!--suppress HtmlUnknownTarget -->
		<img
				alt="dark mode switch"
				aria-label="dark mode switch"
				height="32"
				id="theme-switch-label"
				role="none"
				src={`/icons/${$isDark ? "dark" : "light"}_mode.svg`}
				width="32"
		/>
	</button>
</div>

<style lang="scss">
	@use "static/style/style";

	:global(body) {
		font-family: jetbrains-mono, "Fira Code", monospace;
	}

	:global(i,em) {
		font-family: jetbrains-mono-i, "Fira Code", monospace;
	}

	#page {
		@include style.center;
		max-width: 50%;
		transition: all 0.5s ease;
		color: style.$light-color;

		min: {
			width: 100vw;
		}

		//&.isLight {
		//	color: $dark-color;
		//	background: $light-color;
		//}
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
			color: style.$light-color;

			&:link, &:hover, &:active, &:visited {
				text-decoration: none;
			}

			&.isLight {
				color: style.$dark-color
			}
		}
	}

	#theme-switch {
		margin-bottom: 0.75em;
		cursor: pointer;
		border: none;
		background-color: inherit;
		place-content: center end;
	}

	main { @include style.center }

	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>