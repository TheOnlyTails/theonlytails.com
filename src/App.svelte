<script lang="ts">
	import SocialIcon from "./SocialIcon.svelte"
	import ProjectEntry from "./ProjectEntry.svelte"
	import { isDark, switchTheme } from "./stores/theme.ts"
	import type { Project } from "./elementInterfaces"
	import Logo from "./Logo.svelte"

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
			  `A free and open source mod for Minecraft 1.16, written in Kotlin using the Minecraft Forge API.`,
	  },
	  {
		  name: "LootTables",
		  href: "https://github.com/theonlytails/loottables",
		  description: `A Kotlin DSL for creating loot tables in Minecraft mods (using Forge).`,
	  },
	  {
		  name: "Cryptic Cosmos",
		  href: "https://github.com/Team-Cryptic-Cosmos/Cryptic-Cosmos",
		  description: `A Minecraft mod for 1.16 that introduces exciting new dimensions, mobs, and blocks, made by the Cryptic Cosmos Team.`,
	  },
	  {
		  name: "This website",
		  href: "https://github.com/theonlytails/theonlytails.com",
		  description:
			  `<i>You're looking at it</i>. Built with Svelte, TypeScript, and SCSS.`,
	  },
  ]

</script>

<main id="page" style="background-color: {backgroundColor}; color: {textColor}">
	<header class="header" id="title">
		<Logo src="icons/favicon.svg"/>
		TheOnlyTails
	</header>

	<p id="subtitle">A curious Java and Kotlin programmer.</p>

	<div id="projects">
		<p class="header" id="projects-title">Some of my projects!</p>
		<ul class="projects">
			<!-- This dynamically creates all of the ProjectEntry lines from the projects array. -->
			{#each projects as project}
				<ProjectEntry {...project}/>
			{/each}
		</ul>
	</div>

	<div class="social">
		<SocialIcon href="https://github.com/theonlytails" style={githubIconStyle} title="GitHub"/>
		<SocialIcon href="https://twitter.com/the_only_tails/" title="Twitter"/>
		<SocialIcon href="https://reddit.com/u/theonlytails" title="Reddit"/>
	</div>

	<p class="header" id="reach-out">
		Reach me at <a href="mailto:theonlytails@theonlytails.com">My email</a> or on Twitter!
	</p>


	<button aria-checked="true" aria-labelledby="theme-switch-label" id="theme-switch" on:click={switchTheme}
	        role="switch"
	        style="cursor: pointer">
		<!--suppress HtmlUnknownTarget -->
		<img alt="dark mode switch" aria-label="dark mode switch" height="32" id="theme-switch-label"
		     role="none" src="icons/{$isDark ? 'dark' : 'light'}_mode.svg" width="32"/>
	</button>
</main>

<style lang="scss">
	// Makes sure my make-shift footer still looks good
	#reach-out {
		font: {
			size: 1em;
			weight: bold;
		}
		margin: {
			top: .05em;
			bottom: .05em;
		}
	}

	#theme-switch {
		border: none;
		background-color: inherit;
	}
</style>