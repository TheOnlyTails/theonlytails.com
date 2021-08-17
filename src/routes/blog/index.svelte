<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit"

	export const load: Load = async ({ fetch }) => ({
		props: {
			posts: await fetch("/posts.json").then((res) => res.json())
		}
	})
</script>

<script lang="ts">
	import { isDark } from "$lib/data/theme"

	export let posts: BlogPost[]
</script>

<svelte:head>
	<title>TheOnlyTails &bullet; Blog Posts</title>
</svelte:head>

<div class="posts">
	{#each posts as {path, metadata}}
		<article class="post-card">
			<h3 class="post-card-title" class:isLight={!$isDark}><a class="post-card-title"
			                                                        href="/blog/{metadata.slug}">{metadata.title}</a>
			</h3>
			<p>
				<span class="post-card-author">{metadata.author}</span>
				<span class="post-card-date" class:isLight={!$isDark}>{metadata.date}</span>
			</p>
			<p class="post-card-description">{metadata.description} <a class="post-read-more" href="/blog/{metadata.slug}">Read
				More
				&rightarrow;</a></p>
		</article>
	{/each}
</div>

<style lang="scss">
	@use "../../../static/style/vars";

	.post {
		&s {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-gap: 1em;
		}

		&-card {
			margin: 1rem;
			padding: .7rem .9rem;
			border: vars.$accent .25rem outset;
			border-radius: .4rem;
			line-height: 1.5;

			&-title {
				margin: 0;
				font-size: 1.8rem;
				color: vars.$accent;
			}

			&-author {
				margin-right: .5rem;
				font-weight: 700;
			}

			&-date {
				color: vars.$accent;

				&:where(.isLight) {
					color: vars.$accent;
				}
			}

			&-description {
				max-width: 40ch;
				text-overflow: ellipsis;
				overflow: hidden;

				.post-read-more {
					margin-left: .2rem;
				}
			}

		}
	}
</style>