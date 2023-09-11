<script lang="ts">
  import { page } from "$app/stores"
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar"
  import { Button } from "$lib/components/ui/button"
  import { Input } from "$lib/components/ui/input"
  import { Skeleton } from "$lib/components/ui/skeleton"
  import { searchQuery } from "$lib/data/search"
  import type { PostData } from "$lib/data/types"
  import BookMarkedIcon from "~icons/lucide/book-marked"
  import AtSignIcon from "~icons/lucide/at-sign"
  import GithubIcon from "~icons/lucide/github"
  import TwitterIcon from "~icons/lucide/twitter"

  export let posts: PostData[] | undefined = undefined
</script>

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

  {#if $page.route.id === "/blog" && posts}
    <Input
      bind:value={$searchQuery}
      list="search-post-options"
      placeholder="Search for articles..."
      type="search"
      class="w-auto flex-1"
    />
    <datalist id="search-post-options">
      {#each posts.map((item) => item.title) as postName}
        <option value={postName} />
      {/each}
    </datalist>
  {:else if $page.route.id?.startsWith("/blog/posts/") || $page.route.id === "/"}
    <Button variant="link" href="/blog/"><BookMarkedIcon /> Blog</Button>
  {/if}

  <div>
    <Button href="https://github.com/theonlytails" variant="ghost" size="icon">
      <GithubIcon class="h-4 w-4" />
    </Button>
    <Button href="https://twitter.com/the_only_tails" variant="ghost" size="icon">
      <TwitterIcon class="h-4 w-4" />
    </Button>
    <Button href="mailto:theonlytails@theonlytails.com" variant="ghost" size="icon">
      <AtSignIcon class="h-4 w-4" />
    </Button>
  </div>
</nav>
