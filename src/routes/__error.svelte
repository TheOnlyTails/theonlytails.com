<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  export const load: Load = ({ error, status }) => ({
    props: {
      title: `${ status }: ${ error.message }`,
    },
  })
</script>

<script lang="ts">
  import { goto } from "$app/navigation"

  export let title
</script>

<h2>{title}</h2>
<button class="back" on:click={() => goto("/")}>Return Home</button>

<style lang="scss">
	@use "src/styles/vars";
	@use "src/styles/mixins" as *;

	h2 {
		color: vars.$accent;
	}

	.back {
		padding: 1rem;
		border: .2rem solid vars.$accent;
		border-radius: 100vh;
		background: transparent;
		color: vars.$accent;
		font: {
			family: vars.$font-family;
			size: 1.5rem;
			weight: 500;
		}
		cursor: pointer;
	}
</style>