<script lang="ts">
	import SocialIcon from "../components/SocialIcon.svelte"
	import ProjectEntry from "../components/ProjectEntry.svelte"
	import type { Project } from "../elementInterfaces"
	import { isDark } from "../theme"
	import BlogButton from "../components/BlogButton.svelte"

	const projects: Project[] = [
		{
			name: "DataGenerators",
			href: "/blog/data-generators",
			description: `A group of Kotlin DSLs aimed at creating Minecraft assets using code while sticking to the familiar JSON structure.`
		},
		{
			name: "Cryptic Cosmos",
			href: "https://github.com/Team-Cryptic-Cosmos/Cryptic-Cosmos",
			description: `A Minecraft mod for 1.16 that introduces exciting new dimensions, mobs, and blocks, made by the Cryptic Cosmos Team.`
		},
		{
			name: "This website",
			href: "https://github.com/theonlytails/theonlytails.com",
			description: `<i>You're looking at it</i>. Built with Svelte, TypeScript, and SCSS.`
		},
		{
			name: "RubyMod",
			href: "https://github.com/theonlytails/rubymod",
			description: `A free and open source mod for Minecraft 1.16, written in Kotlin using the Minecraft Forge API.`
		},
	]
</script>

<p id="subtitle">A curious Java and Kotlin programmer.</p>

<BlogButton/>
<div id="projects">
	<p class="header" id="projects-title">
		Some of my projects!
	</p>
	<ul class="projects">
		{#each projects as project}
			<ProjectEntry {...project}/>
		{/each}
	</ul>
</div>

<div class="social">
	<SocialIcon href="https://github.com/theonlytails" invertDark={$isDark} title="GitHub"/>
	<SocialIcon href="https://twitter.com/the_only_tails" title="Twitter"/>
	<SocialIcon href="https://reddit.com/u/theonlytails" title="Reddit"/>
</div>

<p class="header" id="reach-out">
	Reach me at <a href="mailto:theonlytails@theonlytails.com">My email</a> or on Twitter!
</p>

<style lang="scss">
	@use "static/style/mixins";
	@use "static/style/vars";

	// Styles the projects div
	#projects {
		@include mixins.center;

		max-width: 50%;
		margin: 0.1em;
		padding: .25rem;
		border: .2em outset vars.$accent;
		border-radius: .4rem;
		grid-row-gap: 0;
	}

	#projects-title {
		font: {
			size: 1.17em;
			weight: bold;
		}
	}

	#subtitle {
		margin: 0.05em;
	}

	// Makes sure my make-shift footer still looks good
	#reach-out {
		font: {
			size: 1em;
			weight: bold;
		}
		margin: {
			top: 0.05em;
			bottom: 0.05em;
		}
	}
</style>