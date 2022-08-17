<script lang="ts">
  import { searchQuery } from "$lib/data/search"
  import type { PageData } from "./$types"
  import { Metadata } from "$lib"

  export let data: PageData
  $: ({ posts } = data)

  $: filteredPosts = posts.filter((item) =>
    item.title
      .trim()
      .replace(/\s+/gi, "")
      .toLowerCase()
      .includes(($searchQuery ?? "").trim().replace(/\s+/gi, "").toLowerCase())
  )
</script>

<svelte:head>
  <Metadata
    title="TheOnlyTails • Blog"
    description="TheOnlyTails' blog about all kinds of programming stuff"
  />
</svelte:head>

<main>
  <section class="posts">
    {#each $searchQuery === "" ? posts : filteredPosts as post (post.slug)}
      <article class="post-card">
        <h2 class="post-card-title">
          <a class="post-card-title" href="/blog/posts/{post.slug}">{post.title}</a>
        </h2>
        <p class="post-card-info">
          <span class="post-card-author">{post.author}</span>
          <time class="post-card-date" datetime={post.date?.replace(/\//gi, "-")}>{post.date}</time>
        </p>
        <p class="post-card-description">
          {post.description}
          <a class="post-read-more" href="/blog/posts/{post.slug}">Read More ⟶</a>
        </p>
      </article>
    {/each}
  </section>
</main>

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
      padding: 0.7rem 0.9rem;
      border: vars.$accent 0.25rem outset;
      border-radius: 0.4rem;
      line-height: 1.5;

      &-title {
        margin: 0;
        color: vars.$accent;
        font-size: 1.8rem;
      }

      &-author {
        margin-inline-end: 0.5rem;
        font-weight: bold;
      }

      &-title,
      &-info {
        text-align: center;
      }

      &-date {
        color: vars.$accent;
        font-weight: 600;
      }

      @media screen and (width <= 700px) {
        &-info,
        &-description .post-read-more {
          display: none;
        }
      }
    }
  }
</style>
