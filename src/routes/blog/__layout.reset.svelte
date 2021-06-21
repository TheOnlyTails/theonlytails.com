<script lang="ts">
	import { isDark } from "src/stores/theme"
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
		<Logo size="30" src="/favicon.svg"/>
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
	@import "static/style/style";

	:global(body) {
		font-family: jetbrains-mono, "Fira Code", monospace;
	}

	#page {
		font-size: 1.13em;
		display: grid;
		max-width: 50%;
		transition: all 0.5s ease;
		color: $light-color;
		background: $dark-color;
		grid-template-rows: fit-content(100%) 1fr;

		min: {
			width: 100vw;
			height: 100vh;
		}

		&.isLight {
			color: $dark-color;
			background: $light-color;
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
				size: 1em;
				weight: bold;
			}
			vertical-align: middle;
			color: $light-color;

			&:link, &:hover, &:active, &:visited {
				text-decoration: none;
			}

			&.isLight {
				color: $dark-color
			}
		}

		hr { color: $accent }
	}

	main {
		max-width: 97%;
		padding-left: 1rem;
	}
</style>