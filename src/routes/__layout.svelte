<script lang="ts">
	import { page } from "$app/stores"
	import { Metadata, Title } from "$lib"
</script>

<svelte:head>
	{#if $page.path === "/"}
		<Metadata
			title="TheOnlyTails"
			description="TheOnlyTails' personal site and portfolio with all kinds of programming stuff."
		/>
	{/if}
</svelte:head>

<div id="page">
	<header class="header title">
		<Title/>
	</header>

	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	@use "static/style/vars";
	@use "static/style/mixins" as *;
	@use "static/style/global";

	#page {
		@include center;

		grid-template-rows: min-content fit-content(100%);
		min-height: 100vh;
		font-size: 1.1rem;
	}

	header.title {
		margin-block: 2rem;

		font: {
			size: 2em;
			weight: bold;
		}
	}

	main { @include center(1.4rem) }
</style>