<script lang="ts">
    import SocialIcon from "./SocialIcon.svelte"
    import Project from "./Project.svelte"
    import { isDark } from "./stores/theme.ts"
    import { fade } from "svelte/transition"

    const switchTheme = () => isDark.update(value => !value)

    const darkColor = "#444"
    const lightColor = "#EEE"

    $: backgroundColor = $isDark ? darkColor : lightColor
    $: textColor = $isDark ? lightColor : darkColor
    $: githubIconStyle = `filter: invert(${ $isDark ? "100%" : "0%" })`
</script>

<style lang="scss">
  #theme-switch {
    /* styles the icon */
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 40px;
    background-color: inherit;
    border: none;
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
						<Project href="https://github.com/theonlytails/rubymod" name="RubyMod">
								An free and open source mod for <a href="https://minecraft.net">Minecraft</a> 1.16,
								written in Kotlin using the <a href="https://github.com/MinecraftForge/MinecraftForge">Minecraft Forge
								API</a>.
						</Project>
						<Project href="https://github.com/theonlytails/loottables" name="LootTables">
								A Kotlin DSL for creating loot tables in Minecraft mods (using Forge).
						</Project>
						<Project href="https://github.com/Team-Cryptic-Cosmos/Cryptic-Cosmos" name="Cryptic Cosmos">
								A Minecraft mod for 1.16 that introduces exciting new dimensions, mobs, and blocks, made by the
								<a href="https://github.com/Team-Cryptic-Cosmos">Cryptic Cosmos Team</a>.
						</Project>
						<Project href="https://github.com/theonlytails/theonlytails.com" name="This website">
								<i>You are looking at it</i>. Built with <a href="https://svelte.dev">Svelte</a>, <a
										href="https://www.typescriptlang.org/">TypeScript</a>, and <a href="https://sass-lang.com/">SCSS</a>.
						</Project>
				</ul>
		</div>

		<div class="social">
				<SocialIcon href="https://github.com/theonlytails" style={githubIconStyle} title="GitHub"/>
				<SocialIcon href="https://twitter.com/the_only_tails" size={29} title="Twitter"/>
				<SocialIcon href="https://reddit.com/u/theonlytails" title="Reddit"/>
		</div>

		<p id="reach-out">
				Reach me at <a href="https://twitter.com/the_only_tails">Twitter</a>, or in Discord as TheOnlyTails#1886.
		</p>

		<button id="theme-switch" on:click={switchTheme}>{$isDark ? "🌚" : "🌝"}</button>
</main>