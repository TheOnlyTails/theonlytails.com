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
	import { getContext } from "svelte"
	import type { Writable } from "svelte/store"

	export let posts: BlogPost[] = []

	const searchQuery: Writable<string> = getContext("searchQuery")

	$: filteredPosts = posts.filter(item => item.metadata.title
			.trim()
			.replace(/[\s]+/gi, "")
			.toLowerCase()
			.includes(
					($searchQuery ?? "")
							.trim()
							.replace(/[\s]+/gi, "")
							.toLowerCase()
			)
	)
</script>

<svelte:head>
	<title>TheOnlyTails &bullet; Blog Posts</title>
	<meta content="TheOnlyTails' Blog, on all kinds of development stuff." name="description">
</svelte:head>

<section class="posts">
	{#each ($searchQuery === "" ? posts : filteredPosts) as {path, metadata} (metadata.slug)}
		<article class="post-card">
			<h2 class="post-card-title" class:isLight={!$isDark}>
				<a class="post-card-title" href="/blog/{metadata.slug}">{metadata.title}</a>
			</h2>
			<p class="post-card-info">
				<span class="post-card-author">{metadata.author}</span>
				<time class="post-card-date" datetime={metadata.date.replaceAll("/", "-")}
				      class:isLight={!$isDark}>{metadata.date}</time>
			</p>
			<p class="post-card-description">
				{metadata.description}
				<a class="post-read-more" href="/blog/{metadata.slug}">Read More &longrightarrow;</a>
			</p>
		</article>
	{/each}
</section>

<style lang="scss">
	@use "../../../static/style/vars";

	.post {
		&s {
			display: grid;
			grid-template-columns: repeat(4, fit-content(35vw));
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
				color: vars.$accent;
				font-size: 1.8rem;
			}

			&-author {
				margin-inline-end: .5rem;
				font-weight: bold;
			}

			&-title, &-info { text-align: center }

			&-date {
				color: vars.$accent;
				font-weight: 600;

				&:where(.isLight) {
					color: vars.$accent;
				}
			}

			@media screen and (max-width: 700px) {
				&-info, &-description .post-read-more { display: none }
			}
		}
	}
</style>