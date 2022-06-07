<script lang="ts">
  import { searchQuery } from "$lib/data/search"
  import type { BlogPost } from "$lib/data/types"

  export let posts: BlogPost[] = []
</script>

<input
  bind:value={$searchQuery}
  id="search-bar"
  list="search-post-options"
  placeholder="Search for articles..."
  type="search"
/>
<datalist id="search-post-options">
  {#each posts.map((item) => item.metadata.title) as postName}
    <option value={postName}></option>
  {/each}
</datalist>

<style lang="scss">
	@use "src/styles/vars" as *;

	#search-bar {
		padding: 0.75rem;

		border: .2rem solid $accent;
		border-radius: 100vh;
		background: inherit;
		color: $light-color;
		font: {
			family: $font-family;
			weight: 500;
			size: .8em;
		}

		&:focus-visible {
			outline: none;
			box-shadow: 2.5px 2.5px 7.5px 0 #f70;
		}

		@media (prefers-reduced-motion: no-preference) {
			transition: box-shadow 0.25s ease-in-out;
		}

		// remove the dropdown arrow
		&::-webkit-calendar-picker-indicator { display: none !important }

		&::-webkit-search-cancel-button { display: none }
	}
</style>