<script lang="ts">
  import { Title } from "$lib"
</script>

<div id="page">
  <header class="header title">
    <Title />
  </header>

  <main>
    <slot />
  </main>
</div>

<style lang="scss">
	@use "src/styles/vars";
	@use "src/styles/mixins" as *;

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