<script lang="ts">
  import { BlogButton, Metadata, ProjectEntry, SocialIcon } from "$lib"
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
      description: "A website for Files, A modern file explorer that pushes the boundaries of the platform.",
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

<p id="subtitle">A curious frontend programmer</p>

<BlogButton />
<div id="projects">
  <p class="header" id="projects-title">
    Some of my projects!
  </p>
  <ul class="projects">
    {#each projects as project}
      <ProjectEntry {...project} />
    {/each}
  </ul>
</div>

<div class="social">
  <SocialIcon href="https://github.com/theonlytails" title="GitHub" />
  <SocialIcon href="https://twitter.com/the_only_tails" title="Twitter" />
  <SocialIcon href="https://reddit.com/u/theonlytails" title="Reddit" />
</div>

<p class="header" id="reach-out">
  Reach me at <a href="mailto:theonlytails@theonlytails.com">my email</a> or on Twitter!
</p>

<style lang="scss">
	@use "src/styles/mixins" as *;
	@use "src/styles/vars";

	// Styles the projects div
	#projects {
		@include center;
		@include accent-border;

		grid-row-gap: 0;
		max-width: 65%;
		margin: 0.1em;
		padding: .5rem;
		border-radius: 1rem;

		#projects-title {
			font: {
				size: 1.17em;
				weight: bold;
			}
			text-align: center;
		}

		@media screen and (width <= 1000px) {
			max-width: 75%;
		}
	}

	#subtitle {
		margin: .05em;
		font-size: 1.3rem;
		text-align: center;
	}

	// Makes sure my make-shift footer still looks good
	#reach-out {
		align-content: end;
		font: {
			size: 1em;
			weight: 500;
		}
		text-align: center;
	}
</style>
