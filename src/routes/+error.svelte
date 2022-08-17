<script lang="ts">
  import { goto } from "$app/navigation"
	import { page } from "$app/stores"
</script>

<main>
	<h1>Error: Status Code {$page.status}</h1>
	<h2>{$page.error.message}</h2>
	<button class="back" on:click={() => goto("/")}>Return Home</button>
</main>

<style lang="scss">
	@use "src/styles/vars" as *;
	@use "src/styles/mixins" as *;

	main {
		@include center;
		block-size: 100vh;
	}

	h1 {
		color: $accent;
	}

	.back {
		padding: 1rem;
		border: .2rem solid $accent;
		border-radius: 100vh;
		background: transparent;
		color: $accent;
		font: {
			family: $font-family;
			size: 1.5rem;
			weight: 500;
		}
		cursor: pointer;
	}
</style>