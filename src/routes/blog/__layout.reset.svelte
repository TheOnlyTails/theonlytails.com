<script lang="ts">
	import { isDark } from "../../theme"
	import Logo from "../../components/Logo.svelte"
	import BlogButton from "../../components/BlogButton.svelte"
	import ThemeSwitch from "../../components/ThemeSwitch.svelte"

	export let title: string
</script>

<svelte:head>
	<title>{title}</title>
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

<div class:isLight={!$isDark} id="page">
	<header class="header title">
		<Logo size="36" src="/favicon.svg"/>
		<a class="title" class:isLight={!$isDark} href="/">TheOnlyTails</a>
		<BlogButton/>
		<hr/>
	</header>

	<main>
		<slot/>
	</main>

	<ThemeSwitch/>
</div>

<style lang="scss">
	@use "static/style/vars";

	#page {
		font-size: 1.13em;
		display: grid;
		max-width: 50%;
		transition: all 0.5s ease;
		color: vars.$light-color;
		background: vars.$dark-color;
		grid-template-rows: fit-content(100%) 1fr;

		min: {
			width: 100vw;
			height: 100vh;
		}

		&.isLight {
			color: vars.$dark-color;
			background: vars.$light-color;
		}
	}

	header.title {
		margin: {
			top: 1.5rem;
			left: 1em;
		}
		vertical-align: center;

		a {
			font: {
				size: 1.2em;
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

		hr {
			margin: {
				top: 1em;
				right: 1.5em;
			}
			color: vars.$accent;
			border: .25rem solid vars.$accent;
			border-radius: 1rem;
		}
	}

	main {
		max-width: 97%;
		padding-left: 1rem;
	}
</style>