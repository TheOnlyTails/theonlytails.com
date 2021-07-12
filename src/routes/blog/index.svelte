<script context="module" lang="ts">
	/**
	 * @type {import("@sveltejs/kit").Load}
	 */
	export const load = async ({ fetch }) => ({
		props: {
			posts: await fetch("/posts.json").then((res) => res.json())
		}
	})
</script>

<script lang="ts">
	import { isDark } from "../../theme"

	interface BlogPost {
		slug: string;
		title: string;
		author: string;
		description: string;
		date: string;
		published: boolean;
	}

	export let posts: BlogPost[]
</script>

<svelte:head>
	<title>TheOnlyTails - Blog Posts</title>
</svelte:head>

<div class="posts">
	{#each posts as {slug, title, author, description, date}}
		<article class="post-card">
			<h3 class="post-card-title" class:isLight={!$isDark}><a class="post-card-title" href="/blog/{slug}">{title}</a>
			</h3>
			<p>
				<span class="post-card-author">{author}</span>
				<span class="post-card-date" class:isLight={!$isDark}>{date}</span>
			</p>
			<p class="post-card-description">{description} <a class="post-read-more" href="/blog/{slug}">Read More
				&rightarrow;</a></p>
		</article>
	{/each}
</div>

<style lang="scss">
	@use "../../../static/style/vars";

	.posts {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 1em;
	}

	.post-card {
		line-height: 1.5;
		margin: 1rem;
		padding: .7rem .9rem;
		border: vars.$accent .25rem outset;
		border-radius: .4rem;
	}

	.post-card-title {
		font-size: 1.8rem;
		margin: 0;
		color: vars.$accent;
	}

	.post-card-author {
		font-weight: 700;
		margin-right: .5rem;
	}

	.post-card-date {
		color: vars.$accent;

		&:where(.isLight) {
			color: vars.$accent;
		}
	}

	.post-card-description {
		overflow: hidden;
		max-width: 40ch;
		text-overflow: ellipsis;

		.post-read-more {
			margin-left: .2rem;
		}
	}
</style>