<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit"

	// noinspection JSUnusedGlobalSymbols
	export const load: Load = async ({ page, fetch }) => {
		const getSlugFromPath = (path: string) => path.match(/(?<=\.\/blog\/)([\w-]+)(?=\.svx)/i)[0]

		if (page.path.replace(/(\/$)/, "") === "/blog") return {
			props: {
				metadata: null
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
	import ThemeSwitch from "$lib/ThemeSwitch.svelte"
	import Title from "$lib/Title.svelte"
	import { setContext } from "svelte"
	import { persistStore } from "$lib/data/persistStore"
	import Metadata from "$lib/Metadata.svelte"

	export let postMetadata: PostData

	export let searchQuery = persistStore("searchQuery", "")
	setContext("searchQuery", searchQuery)
</script>

<svelte:head>
	{#if postMetadata}
		<Metadata
				title="TheOnlyTails • {postMetadata.title}"
				description={postMetadata.description}
		/>
	{:else}
		<Metadata
				title="TheOnlyTails • Blog"
				description="TheOnlyTails' blog about all kinds of programming stuff"
		/>
	{/if}
	<meta content="blog" name="og:type"/>

	<link href="/style/syntax-highlighting.css" rel="stylesheet">
</svelte:head>

<div class:isLight={!$isDark} id="page">
	<div>
		<nav class="navbar">
			<header class="header title">
				<Title blogLink={!!postMetadata} fontSize={1.2} logoSize={36}/>
			</header>

			{#if !postMetadata}
				<input class:isLight={!$isDark} id="search-bar" bind:value={$searchQuery} type="text"
				       placeholder="Search for articles...">
			{/if}
		</nav>
		<hr/>
	</div>

	<main let:searchQuery>
		{#if postMetadata}
			<h1>{postMetadata.title}</h1>
			<div class="post-info">
				<p class="post-author" title="Author: {postMetadata.author}">Written by: {postMetadata.author}</p>
				<p class="post-date" title="Publication Date: {postMetadata.date}">Published at: {postMetadata.date}</p>
			</div>
		{/if}
		<slot/>
	</main>

	<ThemeSwitch/>
</div>

<style lang="scss">
	@use "static/style/vars";
	@use "static/style/mixins";

	#page {
		@include mixins.page;

		display: grid;
		grid-template-rows: 0fr 1fr min-content;
		min-width: 100%;
		max-width: 50%;
		font-size: 1.13em;

		.navbar {
			display: flex;
			align-items: baseline;
			gap: 1rem;

			header.title {
				margin: {
					top: 1em;
					left: 1em;
				}
			}

			#search-bar {
				@include mixins.accent-border($outset: true);

				justify-self: end;
				margin-top: 1.5rem;
				margin-inline: auto 1rem;
				padding: .5rem;
				background: inherit;
				color: vars.$light-color;
				font: {
					family: vars.$font-family;
					weight: 500;
					size: .75em;
				}

				&.isLight { color: inherit }

				&:focus-visible {
					outline: none;
					box-shadow: 2.5px 2.5px 7.5px 0 #f70;
				}

				@media (prefers-reduced-motion: no-preference) {
					transition: box-shadow .25s ease-in-out;
				}
			}
		}

		hr {
			@include mixins.accent-border;

			margin: 1em;
			border-radius: 1rem;
			color: vars.$accent;
		}

		main {
			padding: 0 1rem;
			overflow: auto;

			.post-info {
				display: flex;
				gap: .75rem;

				.post-date, .post-author {
					@include mixins.accent-border($outset: true);

					max-width: fit-content;
					padding: .5rem;
					border-radius: .4rem;
					color: vars.$accent;
					font-size: 1rem;
				}
			}
		}
	}
</style>