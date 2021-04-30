<script lang="ts">
	import SocialIcon from "./SocialIcon.svelte"
	import ProjectEntry from "./ProjectEntry.svelte"
	import { isDark, switchTheme } from "./stores/theme.ts"
	import type { Project, SocialLink } from "./elementInterfaces"
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

	const socialLinks: SocialLink[] = [
		{
			title: "GitHub",
			href: "https://github.com/theonlytails",
		},
		{
			title: "Twitter",
			href: "https://twitter.com/the_only_tails",
		},
		{
			title: "Reddit",
			href: "https://reddit.com/u/theonlytails",
		},
	]
</script>

<main id="page" style="background-color: {backgroundColor}; color: {textColor}">
	<h1 id="title">
		<Logo src="icons/favicon.svg"/>
		TheOnlyTails
	</h1>

	<h4>A curious Java and Kotlin programmer.</h4>

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
		{#each socialLinks as socialLink}
			{#if socialLink.title !== "GitHub"}
				<SocialIcon {...socialLink}/>
			{:else}
				<SocialIcon {...socialLink} style={githubIconStyle}/>
			{/if}
		{/each}
	</div>

	<h5 id="reach-out">
		Reach me at <a href="mailto:theonlytails@theonlytails.com">My email</a> or on Twitter!
	</h5>

	<button aria-checked={$isDark} id="theme-switch" on:click={switchTheme}
	        role="switch" title="dark mode switch">{$isDark ? "🌚" : "🌝"}</button>
</main>

<style lang="scss">
	// styles the icon
	#theme-switch {
		font-size: 2.2em;
		cursor: pointer;
		border: none;
		background-color: inherit;
	}
</style>