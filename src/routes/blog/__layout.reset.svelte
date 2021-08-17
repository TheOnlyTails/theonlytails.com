<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit"

	export const load: Load = async ({ page, fetch }) => {
		const getSlugFromPath = (path: string) => path.replace(/(^.\/blog\/)/, "").replace(/(.svx$)/g, "")

		if (page.path.replace(/(\/$)/, "") === "/blog") return {
			props: {
				metadata: null
			}
		}

		const posts: BlogPost[] = await fetch("/posts.json").then(r => r.json())
		console.log(posts)
		const slug = getSlugFromPath(posts.find(post => getSlugFromPath(post.path)).path)
		console.log(slug)
		const post: PostData = await fetch(`/blog/${ slug }.json`).then(r => r.json())
		console.log(post)

		return {
			props: {
				metadata: post
			}
		}
	}
</script>

<script lang="ts">
	import { isDark } from "$lib/data/theme"
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
		<meta content="TheOnlyTails • {metadata.title}" name="og:title"/>
		<meta content={metadata.description} name="description"/>
		<meta content={metadata.description} name="og:description"/>
	{:else}
		<meta content="TheOnlyTails • Blog Posts" name="og:title"/>
	{/if}
	<meta content="blog" name="og:type"/>
	<meta content="https://www.theonlytails.com/icons/logo.png" name="og:image"/>

	{#if metadata}
		<meta content="TheOnlyTails • {metadata.title}" name="twitter:title"/>
		<meta content={metadata.description} name="twitter:description"/>
	{:else}
		<meta content="TheOnlyTails • Blog Posts" name="twitter:title"/>
	{/if}
	<meta content="https://www.theonlytails.com/icons/logo.png" name="twitter:image"/>
	<meta content="@the_only_tails" name="twitter:creator"/>

	<link href="/style/syntax-highlighting.css" rel="stylesheet">
</svelte:head>

<div class:isLight={!$isDark} id="page">
	<header class="header title">
		<Title blogLink fontSize={1.2} logoSize={36}/>
	</header>

	<main>
		{#if metadata}
			<h1>{metadata.title}</h1>
			<div class="post-info">
				<p class="post-author" title="Author: {metadata.author}">Written by: {metadata.author}</p>
				<p class="post-date" title="Publication Date: {metadata.date}">Published at: {metadata.date}</p>
			</div>
		{/if}
		<slot/>
	</main>

	<ThemeSwitch/>
</div>

<style lang="scss">
	@use "static/style/vars";

	#page {
		display: grid;
		grid-template-rows: 0fr 1fr min-content;
		max-width: 50%;
		background: vars.$dark-color;
		color: vars.$light-color;
		font-size: 1.13em;
		transition: all 0.5s ease;

		min: {
			width: 100%;
			height: 100vh;
		}

		&.isLight {
			background: vars.$light-color;
			color: vars.$dark-color;
		}
	}

	header.title {
		margin: {
			top: 1.5rem;
			left: 1em;
		}
		vertical-align: center;
	}

	main {
		padding-left: 1rem;
		overflow-wrap: anywhere;

		.post-info {
			display: flex;
			gap: .75rem;

			.post-date, .post-author {
				max-width: fit-content;
				padding: .5rem;
				border: .2em outset vars.$accent;
				border-radius: .4rem;
				color: vars.$accent;
				font-size: 1rem;
			}
		}
	}
</style>