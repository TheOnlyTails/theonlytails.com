<script lang="ts">
  import { BlogButton, Metadata, Searchbar, Title } from "$lib"
  import type { LayoutData } from "./$types"
  import { page } from "$app/stores"
</script>

<svelte:head>
  <Metadata
    title="TheOnlyTails • Blog"
    description="TheOnlyTails' blog about all kinds of programming stuff"
  />
  <meta content="blog" name="og:type" />
</svelte:head>

<div id="page">
  <nav class="navbar">
    <header class="header title">
      <Title fontSize={1.2} logoSize={36} />
    </header>

    {#if $page.data.posts}
      <Searchbar posts={$page.data.posts} />
    {:else if $page.data.post}
      <BlogButton />
    {/if}
  </nav>

  <hr />

  <slot />
</div>

<style lang="scss">
  @use "src/styles/mixins" as *;
  @use "src/styles/vars" as *;

  #page {
    display: grid;
    grid-template-rows: min-content min-content fit-content(100%);
    min-inline-size: 100%;
    max-inline-size: 50%;
    min-block-size: 100vh;
    font-size: 1.1rem;

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      padding-block-start: 1em;
      padding-inline: 1em;
    }

    hr {
      margin: 1rem;
      border-style: solid;
      color: $accent;
    }
  }
</style>
