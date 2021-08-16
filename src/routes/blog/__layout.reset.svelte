<script lang="ts">
	import "../../app.css"
	import { isDark } from "$lib/data/theme"
	import BlogButton from "$lib/BlogButton.svelte"
	import ThemeSwitch from "$lib/ThemeSwitch.svelte"
	import Title from "$lib/Title.svelte"
</script>

<svelte:head>
	<!--	<title>{title}</title>-->
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
		<div id="top-buttons">
			<Title fontSize={1.2} logoSize={36}/>
			<BlogButton/>
		</div>

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
		grid-template-rows: 0fr 1fr min-content;

		min: {
			width: 100%;
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

		#top-buttons {
			//display: flex;
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
		padding-left: 1rem;
	}
</style>