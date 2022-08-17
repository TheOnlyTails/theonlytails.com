<script lang="ts">
  import { BlogButton, Metadata, ProjectEntry, SocialIcon, Title } from "$lib"
  import type { Project } from "$lib/data/types"

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
    <Title />
  </header>

  <main>
    <p id="subtitle">A curious frontend programmer</p>

    <BlogButton />
    <div id="projects">
      <p class="header" id="projects-title">Some of my projects!</p>
      <ul class="projects">
        {#each projects as project}
          <ProjectEntry {...project} />
        {/each}
      </ul>
    </div>

    <div class="social">
      <SocialIcon href="/github" title="GitHub" />
      <SocialIcon href="/twitter" title="Twitter" />
      <SocialIcon href="https://reddit.com/u/theonlytails" title="Reddit" />
    </div>
  </main>

  <footer class="header" id="reach-out">
    Reach me at <a href="mailto:theonlytails@theonlytails.com">my email</a> or on Twitter!
  </footer>
</div>

<style lang="scss">
  @use "src/styles/main";
</style>
