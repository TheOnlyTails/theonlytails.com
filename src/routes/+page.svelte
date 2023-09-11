<script lang="ts">
  import { BlogButton, Metadata } from "$lib"
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar"
  import { Button } from "$lib/components/ui/button"
  import { Skeleton } from "$lib/components/ui/skeleton"
  import type { Project } from "$lib/data/types"
  import AtSignIcon from "~icons/lucide/at-sign"
  import GithubIcon from "~icons/lucide/github"
  import TwitterIcon from "~icons/lucide/twitter"

  const projects: Project[] = [
    {
      name: "Fluent Svelte",
      href: "https://fluent-svelte.vercel.app/",
      description: "A faithful implementation of Microsoft's Fluent Design System in Svelte.",
    },
    {
      name: "Files",
      href: "https://files.community/",
      description:
        "A website for Files, A modern file explorer that pushes the boundaries of the platform.",
    },
    {
      name: "theonlytails.com",
      href: "https://github.com/theonlytails/theonlytails.com",
      description: `<i>You're looking at it</i>. Built with SvelteKit, TypeScript, and SCSS.`,
    },
  ]
</script>

<svelte:head>
  <Metadata
    title="TheOnlyTails"
    description="TheOnlyTails' personal site and portfolio with all kinds of programming stuff."
  />
</svelte:head>

<div id="page">
  <header class="header title">
    <h1 class="flex items-center gap-4 my-0 text-primary sm:ml-auto">
      <Avatar>
        <AvatarImage src="/favicon.svg" alt="TheOnlyTails avatar" />
        <AvatarFallback><Skeleton class="w-10 h-10 rounded-full" /></AvatarFallback>
      </Avatar>
      <a class="text-current font-semibold" href="/">TheOnlyTails</a>
    </h1>
  </header>

  <p class="">A curious frontend programmer</p>

  <BlogButton />
  <section
    class="flex flex-col justify-evenly items-center gap-0 max-w-[65%] sm:max-w-[75%] m-1 p-2 rounded-2xl outline-4 outline-accent"
  >
    <p class="header text-lg font-semibold text-center">Some of my projects!</p>
    <ul class="projects">
      {#each projects as { href, name, description }}
        <li class="project">
          <a {href}>{name}</a> - {@html description}
        </li>
      {/each}
    </ul>
  </section>

  <div class="social">
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
</div>

<style>
  @import "../styles/main.css";
</style>
