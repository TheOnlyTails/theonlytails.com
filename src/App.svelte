<script lang="ts">
	import SocialIcon from "./SocialIcon.svelte"
  import ProjectEntry from "./ProjectEntry.svelte"
  import { isDark } from "./stores/theme.ts"
  import { fade } from "svelte/transition"
  import type { Project } from "./Project"

  const darkColor = "#444"
  const lightColor = "#eee"

  $: backgroundColor = $isDark ? darkColor : lightColor
  $: textColor = $isDark ? lightColor : darkColor
  // inverts the github social icon according to the theme
  $: githubIconStyle = `filter: invert(${ $isDark ? "100%" : "0%" })`

  const projects: Project[] = [
	  {
		  name: "RubyMod",
		  href: "https://github.com/theonlytails/rubymod",
		  description:
			  `A free and open source mod for <a href="https://minecraft.net">Minecraft</a> 1.16, written in Kotlin using the <a href="https://github.com/MinecraftForge/MinecraftForge">Minecraft Forge API</a>.`,
	  },
	  {
			name: "LootTables",
			href: "https://github.com/theonlytails/loottables",
			description: `A Kotlin DSL for creating loot tables in Minecraft mods (using Forge).`,
		},
		{
			name: "Cryptic Cosmos",
			href: "https://github.com/Team-Cryptic-Cosmos/Cryptic-Cosmos",
			description: `A Minecraft mod for 1.16 that introduces exciting new dimensions, mobs, and blocks, made by the <a href="https://github.com/Team-Cryptic-Cosmos">Cryptic Cosmos Team</a>.`,
		},
		{
			name: "This website",
			href: "https://github.com/theonlytails/theonlytails.com",
			description:
				`<i>You're looking at it</i>. Built with <a href="https://svelte.dev">Svelte</a>, <a href="https://www.typescriptlang.org/">TypeScript</a>, and <a href="https://sass-lang.com/">SCSS</a>.`,
		},
	]
</script>

<style global lang="scss">
	#theme-switch {
		/* styles the icon */
		font-size: 40px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		cursor: pointer;
		border: none;
		background-color: inherit;
	}
</style>

<main id="page" style="background-color: {backgroundColor}; color: {textColor}">
	<h1 id="title" transition:fade={{duration: 300}}>
		<!--suppress HtmlUnknownTarget -->
		<img alt="My icon!" height={35} id="logo" src="icons/favicon.svg" width={35}>
		TheOnlyTails
	</h1>

	<h4>
		A curious <a href="https://openjdk.java.net/">Java</a> and <a href="https://kotl.in">Kotlin</a> programmer.
	</h4>

	<div id="projects">
		<h3 id="projects-title">Some of my projects!</h3>
		<ul class="projects">
			<!-- This dynamically creates all of the ProjectEntry lines from the projects array. -->
			{#each projects as project}
				<ProjectEntry {...project}/>
			{/each}
		</ul>
	</div>

	<div class="social">
		<SocialIcon href="https://github.com/theonlytails" style={githubIconStyle} title="GitHub"/>
		<SocialIcon href="https://twitter.com/the_only_tails" size={29} title="Twitter"/>
		<SocialIcon href="https://reddit.com/u/theonlytails" title="Reddit"/>
	</div>

	<p id="reach-out">
		Reach me at <a href="mailto:theonlytails@theonlytails.com">My email</a>, <a
			href="https://twitter.com/the_only_tails">Twitter</a>, or in Discord as TheOnlyTails#1886.
	</p>

	<button id="theme-switch" on:click={() => isDark.update(value => !value)}>{$isDark ? "🌚" : "🌝"}</button>
</main>