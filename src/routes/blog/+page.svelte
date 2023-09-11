<script lang="ts">
  import { Metadata } from "$lib"
  import { Badge } from "$lib/components/ui/badge"
  import { Button } from "$lib/components/ui/button"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card"
  import { searchQuery } from "$lib/data/search"
  import Calendar from "~icons/lucide/calendar-days"
  import ChevronRightIcon from "~icons/lucide/chevron-right"
  import TagIcon from "~icons/lucide/tag"
  import TagsIcon from "~icons/lucide/tags"

  export let data
  $: ({ posts, tag } = data)

  $: queriedPosts = posts.filter((item) =>
    $searchQuery
      ? item.title
          .trim()
          .replace(/\s+/gi, "")
          .toLowerCase()
          .includes(($searchQuery ?? "").trim().replace(/\s+/gi, "").toLowerCase())
      : true
  )
</script>

<svelte:head>
  <Metadata
    title="TheOnlyTails • Blog"
    description="TheOnlyTails' blog about all kinds of programming stuff"
  />
</svelte:head>

<main class="m-4 flex flex-col gap-4">
  <div class="flex items-center gap-2">
    <TagsIcon />
    <Button href="/blog" variant="outline" class="flex items-center gap-[1ch]">All tags</Button>
    {#each posts.flatMap((p) => p.tags).flat() as tag}
      <a href="/blog?tag={tag}">
        <Badge class="m-0"><TagIcon /> {tag}</Badge>
      </a>
    {/each}
  </div>

  <div class="grid grid-cols-3 max-sm:grid-cols-1 gap-4">
    {#each filteredPosts as post (post.slug)}
      <Card>
        <CardHeader>
          <CardTitle>
            <a style="view-transition-name: post-title-{post.slug}" href="/blog/posts/{post.slug}">
              {post.title}
            </a>
          </CardTitle>
          <CardDescription>
            {post.description}
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-muted-foreground">
          <time
            datetime={post.date.replace(/\//g, "-")}
            style="view-transition-name: post-date-{post.slug}"
          >
            <Calendar />
            Published on {new Date(post.date).toLocaleDateString("en-US", { dateStyle: "long" })}
          </time>

          <ul
            class="flex flex-wrap gap-4 items-center"
            style="view-transition-name: post-tags-{post.slug}"
          >
            <TagsIcon />
            {#each post.tags as tag}
              <li><Badge>{tag}</Badge></li>
            {/each}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="link" class="ml-auto" href="/blog/posts/{post.slug}">
            Read More <ChevronRightIcon />
          </Button>
        </CardFooter>
      </Card>
    {/each}
  </div>
</main>
