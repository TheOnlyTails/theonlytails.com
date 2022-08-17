<script lang="ts">
  import type { LayoutData } from "./$types"
  import { Metadata } from "$lib"

  export let data: LayoutData
  $: ({ post } = data)
</script>

<svelte:head>
  <Metadata title="TheOnlyTails • {post.title}" description={post.description} />
</svelte:head>

<article>
  <h1 class="post-title">{post.title}</h1>
  <div class="post-info">
    <p class="post-author" title="Author: {post.author}">
      Written by: {post.author}
    </p>
    <p class="post-date" title="Publication Date: {post.date}">
      Published at: {post.date}
    </p>
  </div>

  <main>
    <slot />
  </main>

  <hr class="footer-divider" />
  <footer class="footer">
    <a
      class="article-footer-link"
      href="https://github.com/TheOnlyTails/theonlytails.com/blob/main/src/routes/blog/posts/{post.slug}/+page.md"
      target="_blank"
    >
      <img class="article-footer-link-icon" src="/icons/code.svg" alt="GitHub" />
      View Article Source
    </a>
  </footer>
</article>

<style lang="scss">
  @use "src/styles/blog";
</style>
