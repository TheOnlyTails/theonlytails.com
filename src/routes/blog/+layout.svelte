<script lang="ts">
  import { page } from "$app/stores"
  import { Metadata } from "$lib"
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar"
  import { Button } from "$lib/components/ui/button"
  import { Input } from "$lib/components/ui/input"
  import { Separator } from "$lib/components/ui/separator"
  import { Skeleton } from "$lib/components/ui/skeleton"
  import { searchQuery } from "$lib/data/search"
  import BookMarked from "~icons/lucide/book-marked"

  export let data
  $: ({ posts } = data)
</script>

<svelte:head>
  <Metadata
    title="TheOnlyTails • Blog"
    description="TheOnlyTails' blog about all kinds of programming stuff"
  />
  <meta content="blog" name="og:type" />
</svelte:head>

<nav class="flex items-center justify-between gap-4 p-4">
  <header class="header title">
    <h1 class="flex items-center gap-4 my-0 sm:ml-auto">
      <Avatar>
        <AvatarImage src="/favicon.svg" alt="TheOnlyTails avatar" />
        <AvatarFallback><Skeleton class="w-10 h-10 rounded-full" /></AvatarFallback>
      </Avatar>
      <a class="text-current font-semibold" href="/">TheOnlyTails</a>
    </h1>
  </header>

  {#if $page.route.id === "/blog"}
    <Input
      bind:value={$searchQuery}
      list="search-post-options"
      placeholder="Search for articles..."
      type="search"
    />
    <datalist id="search-post-options">
      {#each posts.map((item) => item.title) as postName}
        <option value={postName} />
      {/each}
    </datalist>
  {:else if $page.data.post}
    <Button variant="link" href="/blog/"><BookMarked /> Blog</Button>
  {/if}
</nav>

<Separator />

<slot />
