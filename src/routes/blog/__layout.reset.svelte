<script lang="ts">
  import { isDark, switchTheme } from "../../stores/theme";
  import Logo from "../../components/Logo.svelte";
  import BlogButton from "../../components/BlogButton.svelte";
</script>

<svelte:head>
  <title>TheOnlyTails</title>
  <meta content="TheOnlyTails" name="og:title" />
  <meta content="TheOnlyTails' website" name="description" />
  <meta content="TheOnlyTails' website" name="og:description" />
  <meta content="https://www.theonlytails.com/icons/favicon.png" name="og:image" />
  <meta content="https://www.theonlytails.com" name="og:url" />

  <link href="/favicon.svg" rel="icon" />
  <link href="/style/style.css" rel="stylesheet" />
  <link href="/style/links.css" rel="stylesheet" />
  <link href="/fonts/jb-mono.css" rel="stylesheet" />
</svelte:head>

<div class:isLight={!$isDark} id="page">
  <header class="header title">
    <Logo src="/favicon.svg" />
    <a class="title" class:isLight={!$isDark} href="/">TheOnlyTails</a>
    <BlogButton />
  </header>

  <main>
    <slot />
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
		place-content: start;

		a {
			font: {
				size: 2em;
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
	}

	#theme-switch {
		margin-bottom: .75em;
		cursor: pointer;
		border: none;
		background-color: inherit;
		place-content: center end;
	}

	main { @include center }
</style>