<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit"

	export const load: Load = async ({ page, fetch }) => {
		const getSlugFromPath = (path: string) => path.replace("./blog/", "").replaceAll(".svx", "")

		if (page.path === "/blog") {
			return {
				props: {
					metadata: null
				}
			}
		}

		const posts: BlogPost[] = await fetch("/posts.json").then(r => r.json())
		const slug = getSlugFromPath(posts.find(post => getSlugFromPath(post.path)).path)
		const post: PostData = await fetch(`/blog/${ slug }.json`).then(r => r.json())

		return {
			props: {
				metadata: post
			}
		}
	}
</script>

<script lang="ts">
	import { isDark } from "$lib/data/theme"
	import BlogButton from "$lib/BlogButton.svelte"
	import ThemeSwitch from "$lib/ThemeSwitch.svelte"
	import Title from "$lib/Title.svelte"
	import { onMount } from "svelte"

	export let metadata: PostData

	onMount(() => {
		console.log(metadata)
	})
</script>

<svelte:head>
	{#if metadata}
		<title>TheOnlyTails &bullet; {metadata.title}</title>
	{:else}
		<title>TheOnlyTails &bullet; Blog Posts</title>
	{/if}

	{#if metadata}
		<meta content="TheOnlyTails &bullet; {metadata.title}" name="og:title"/>
		<meta content={metadata.description} name="description"/>
		<meta content={metadata.description} name="og:description"/>
	{:else}
		<meta content="TheOnlyTails &bullet; Blog Posts" name="og:title"/>
	{/if}
	<meta content="blog" name="og:type"/>
	<meta content="https://www.theonlytails.com/icons/favicon.png" name="og:image"/>

	{#if metadata}
		<meta content="TheOnlyTails &bullet; {metadata.title}" name="twitter:title"/>
		<meta content={metadata.description} name="twitter:description"/>
	{:else}
		<meta content="TheOnlyTails &bullet; Blog Posts" name="twitter:title"/>
	{/if}
	<meta content="https://www.theonlytails.com/icons/favicon.png" name="twitter:image"/>
	<meta content="@the_only_tails" name="twitter:creator"/>

	<link href="/favicon.svg" rel="icon"/>
	<link href="/style/style.css" rel="stylesheet"/>
	<link href="/style/links.css" rel="stylesheet"/>
	<link href="/fonts/jb-mono.css" rel="stylesheet"/>
</svelte:head>

<div class:isLight={!$isDark} id="page">
	<header class="header title">
		<Title fontSize={1.2} logoSize={36}/>
		<BlogButton/>

		<hr/>
	</header>

	<main>
		{#if metadata}
			<h1>{metadata.title}</h1>
			<div class="post-info">
				<p class="post-author">Written by: {metadata.author}</p>
				<p class="post-date">Published at: {metadata.date}</p>
			</div>
		{/if}
		<slot/>
	</main>

	<ThemeSwitch/>
</div>

<style lang="scss">
	@use "static/style/vars";

	#page {
		font-size: 1.13em;
		display: grid;
		max-width: 50%;
		transition: all 0.5s ease;
		color: vars.$light-color;
		background: vars.$dark-color;
		grid-template-rows: 0fr 1fr min-content;

		min: {
			width: 100%;
			height: 100vh;
		}

		&.isLight {
			color: vars.$dark-color;
			background: vars.$light-color;
		}
	}

	header.title {
		margin: {
			top: 1.5rem;
			left: 1em;
		}
		vertical-align: center;

		hr {
			margin: {
				top: 1em;
				right: 1.5em;
			}
			color: vars.$accent;
			border: .25rem solid vars.$accent;
			border-radius: 1rem;
		}
	}

	main {
		padding-left: 1rem;

		.post-info {
			display: flex;
			gap: .75rem;

			.post-date, .post-author {
				font-size: 1rem;
				max-width: fit-content;
				padding: .5rem;
				color: vars.$accent;
				border: .2em outset vars.$accent;
				border-radius: .4rem;
			}
		}
	}
</style>