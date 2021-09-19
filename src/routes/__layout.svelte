<script lang="ts">
	import { isDark } from "$lib/data/theme"
	import ThemeSwitch from "$lib/ThemeSwitch.svelte"
	import Title from "$lib/Title.svelte"
	import Metadata from "$lib/Metadata.svelte"
</script>

<svelte:head>
	<Metadata
			description="TheOnlyTails' personal site and portfolio with all kinds of programming stuff."
			title="TheOnlyTails"
	/>
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