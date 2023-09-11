<script lang="ts">
  import { Metadata } from "$lib"
  import { Badge } from "$lib/components/ui/badge"
  import { Button } from "$lib/components/ui/button"
  import * as Markdown from "$lib/markdown"
  import CalendarIcon from "~icons/lucide/calendar-days"
  import MiddleDot from "~icons/lucide/dot"
  import GithubIcon from "~icons/lucide/github"
  import TagsIcon from "~icons/lucide/tags"
  import ShareMenu from "./ShareMenu.svelte"

  export let data
  $: ({ post } = data)
</script>

<svelte:head>
  <Metadata title="TheOnlyTails • {post.title}" description={post.description} />
</svelte:head>

<article class="relative flex flex-col gap-4 p-4">
  <Markdown.h1 style="view-transition-name: post-title-{post.slug}">{post.title}</Markdown.h1>
  <div class="flex items-center gap-4 text-muted-foreground">
    <time
      datetime={post.date.replace(/\//g, "-")}
      style="view-transition-name: post-date-{post.slug}"
    >
      <CalendarIcon />
      Published on {post.date}
    </time>

    <MiddleDot />

    <ul
      class="flex flex-wrap gap-4 items-center"
      style="view-transition-name: post-tags-{post.slug}"
    >
      <TagsIcon />
      {#each post.tags as tag}
        <li>
          <a href="/blog?tag={tag}">
            <Badge>{tag}</Badge>
          </a>
        </li>
      {/each}
    </ul>

    <MiddleDot />

    <ShareMenu />
  </div>
  <Button
    class="absolute top-6 right-4"
    href="https://github.com/TheOnlyTails/theonlytails.com/blob/main/src/routes/blog/posts/{post.slug}/+page.md"
    target="_blank"
    variant="outline"
    style="view-transition-name: none"
  >
    <GithubIcon />
    View Article Source
  </Button>

  <main class="markdown">
    <slot />
  </main>
</article>
