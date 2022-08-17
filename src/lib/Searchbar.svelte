<script lang="ts">
  import { searchQuery } from "$lib/data/search"
  import type { PostData } from "$lib/data/types"

  export let posts: PostData[] = []
</script>

<input
  bind:value={$searchQuery}
  id="search-bar"
  list="search-post-options"
  placeholder="Search for articles..."
  type="search"
/>
<datalist id="search-post-options">
  {#each posts.map((item) => item.title) as postName}
    <option value={postName}></option>
  {/each}
</datalist>

<style lang="scss">
	@use "src/styles/vars" as *;

	#search-bar {
		inline-size: 20vw;
		padding: 0.75rem;

		outline: .2rem solid $accent;
		border-radius: 1rem;
		background: inherit;
		color: $light-color;
		font: {
			family: $font-family;
			weight: 500;
			size: .8em;
		}

		// remove the dropdown arrow
		&::-webkit-calendar-picker-indicator { display: none !important }

		&::-webkit-search-cancel-button { display: none }
	}
</style>