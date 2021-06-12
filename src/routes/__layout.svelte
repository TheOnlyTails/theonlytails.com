<script lang="ts">
  import { isDark, switchTheme } from "../stores/theme";
  import Logo from "../components/Logo.svelte";
</script>

<svelte:head>
  <title>TheOnlyTails</title>
  <meta content="TheOnlyTails" property="og:title" />
  <meta content="TheOnlyTails' website" property="description" />
  <meta content="TheOnlyTails' website" property="og:description" />
  <meta content="https://www.theonlytails.com/icons/favicon.png" property="og:image" />
  <meta content="https://www.theonlytails.com" property="og:url" />

  <link href="/favicon.svg" rel="icon" />
  <link href="/style/style.css" rel="stylesheet" />
  <link href="/style/links.css" rel="stylesheet" />
  <link href="/fonts/jb-mono.css" rel="stylesheet" />
</svelte:head>

<div class:isLight={!$isDark} id="page">
  <header class="header" id="title">
    <Logo src="/favicon.svg" />
    TheOnlyTails
  </header>

  <slot />

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

	#page {
		@include center;

		font-family: jetbrains-mono, "Fira Code", monospace;
		font-size: 1.13em;
		max-width: 50%;
		transition: all 0.5s ease;
		color: $light-color;
		background: $dark-color;

		min: {
			width: 100vw;
			height: 100vh;
		}

		&.isLight {
			color: $dark-color;
			background: $light-color;
		}
	}

	#title {
		font: {
			size: 2em;
			weight: bold;
		}
		margin-top: 0.75em;
	}

	#theme-switch {
		margin-bottom: 0.75em;
		cursor: pointer;
		border: none;
		background-color: inherit;
		place-self: center end;
	}
</style>