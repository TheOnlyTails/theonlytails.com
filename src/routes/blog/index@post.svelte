<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit"

  // noinspection JSUnusedGlobalSymbols
  export const load: Load = async ({ fetch }) => ({
    props: {
      posts: await fetch("/posts.json").then((res) => res.json()),
    },
  })
</script>

<script lang="ts">
  import { searchQuery } from "$lib/data/search"
  import type { BlogPost } from "$lib/data/types"

  export let posts: BlogPost[] = []

  $: filteredPosts = posts.filter(item => item.metadata.title
    .trim()
    .replace(/\s+/gi, "")
    .toLowerCase()
    .includes(($searchQuery ?? "")
      .trim()
      .replace(/\s+/gi, "")
      .toLowerCase(),
    ),
  )
</script>

<section class="posts">
  {#each ($searchQuery === "" ? posts : filteredPosts) as { path, metadata } (metadata.slug)}
    <article class="post-card">
      <h2 class="post-card-title">
        <a class="post-card-title" href={path}>{metadata.title}</a>
      </h2>
      <p class="post-card-info">
        <span class="post-card-author">{metadata.author}</span>
        <time class="post-card-date" datetime={metadata.date.replace(/\//gi, "-")}>{metadata.date}</time>
      </p>
      <p class="post-card-description">
        {metadata.description}
        <a class="post-read-more" href={path}>Read More ⟶</a>
      </p>
    </article>
  {/each}
</section>

<style lang="scss">
	@use "src/styles/vars";

	.post {
		&s {
			display: grid;
			grid-template-columns: repeat(4, fit-content(35vw));
			grid-gap: 1em;
		}

		&-card {
			margin: 1rem;
			padding: .7rem .9rem;
			border: vars.$accent .25rem outset;
			border-radius: .4rem;
			line-height: 1.5;

			&-title {
				margin: 0;
				color: vars.$accent;
				font-size: 1.8rem;
			}

			&-author {
				margin-inline-end: .5rem;
				font-weight: bold;
			}

			&-title, &-info { text-align: center }

			&-date {
				color: vars.$accent;
				font-weight: 600;
			}

			@media screen and (width <= 700px) {
				&-info, &-description .post-read-more { display: none }
			}
		}
	}
</style>
