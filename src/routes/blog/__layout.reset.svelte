<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit"

	// noinspection JSUnusedGlobalSymbols
	export const load: Load = async ({ fetch, page }) => {
		const posts: BlogPost[] = await fetch("/posts.json").then(r => r.json())

		const path = page.path.replace(/(\/$)/, "")

		const postMetadata: PostData = path !== "/blog" ? await fetch(`${ path }.json`).then(r => r.json()) : null

		return {
			props: {
				posts,
				postMetadata,
				path,
			},
		}
	}
</script>

<script lang="ts">
	import Title from "$lib/Title.svelte"
	import Metadata from "$lib/Metadata.svelte"
	import Searchbar from "$lib/Searchbar.svelte"
	import BlogButton from "$lib/BlogButton.svelte"

	export let posts: BlogPost[] = []
	export let postMetadata: PostData
	export let path: string
</script>

<svelte:head>
	{#if !postMetadata}
		<Metadata
				title="TheOnlyTails • Blog"
				description="TheOnlyTails' blog about all kinds of programming stuff"
		/>
	{:else}
		<Metadata title="TheOnlyTails • {postMetadata.title}" description={postMetadata.description}/>
	{/if}
	<meta content="blog" name="og:type"/>
</svelte:head>

<div id="page">
	<div>
		<nav class="navbar">
			<header class="header title">
				<Title fontSize={1.2} logoSize={36}/>
			</header>

			{#if !postMetadata}
				<Searchbar {posts}/>
			{:else}
				<BlogButton/>
			{/if}
		</nav>
		<hr/>
	</div>

	{#if postMetadata}
		<article>
			<h1 class="post-title">{postMetadata.title}</h1>
			<div class="post-info">
				<p class="post-author" title="Author: {postMetadata.author}">
					Written by: {postMetadata.author}
				</p>
				<p class="post-date" title="Publication Date: {postMetadata.date}">
					Published at: {postMetadata.date}
				</p>
			</div>

			<slot/>

			<hr class="footer-divider"/>
			<footer class="footer">
				<a
						class="article-footer-link"
						href="https://github.com/TheOnlyTails/theonlytails.com/blob/main/src/routes/blog/{postMetadata.slug}.md"
						target="_blank"
				>
					<img class="article-source-link-icon" src="/icons/code.svg" alt="GitHub">
					View Article Source
				</a>
				<a href="{path}.json" target="_blank" rel="external" class="article-footer-link">
					<img class="article-source-link-icon" src="/icons/info.svg" alt="Info">
					View Article Metadata
				</a>
			</footer>
		</article>
	{:else}
		<main>
			<slot/>
		</main>
	{/if}
</div>

<style lang="scss">
	@use "static/style/vars";
	@use "static/style/mixins" as *;
	@use "static/style/markdown-hints";
	@use "static/style/syntax-highlighting";

	#page {
		display: grid;
		grid-template-rows: min-content fit-content(100%);
		min-width: 100%;
		max-width: 50%;
		min-height: 100vh;
		font-size: 1.1rem;

		.navbar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1rem;

			padding-block-start: 1em;
			padding-inline: 1em;
		}

		hr {
			@include accent-border;

			margin: 1rem;
			border-radius: 1rem;
			color: vars.$accent;
		}

		main,
		article {
			@include markdown-hints.hints;

			padding: 0 1rem;
			overflow: auto;

			h1 {
				margin-block: 2rem .5rem;
				font-size: 2.5rem;
				text-align: center;
			}

			.post-info {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 1rem;
				margin-block-end: 2rem;

				.post-date,
				.post-author {
					@include accent-border;

					max-width: fit-content;
					padding: 0.75rem;
					border-radius: 100vh;
					color: vars.$accent;
					font-size: 1rem;
				}
			}
		}

		.footer-divider {
			margin-block: 2rem;
		}

		.footer {
			display: flex;
			justify-content: center;
			margin-block-end: 2rem;

			.article-footer-link {
				display: flex;
				align-items: center;
				justify-content: center;
				gap: .5rem;
				margin-inline-start: 1.25rem;

				&:link,
				&:visited {
					color: vars.$light-color;
					transition: inherit, color 0.5s ease;
				}

				&-icon {
					width: 2ch;
					aspect-ratio: 1;
				}
			}
		}
	}
</style>
