<script lang="ts">
	import { Metadata } from "$lib";
	import { Badge } from "$lib/components/ui/badge";
	import { Button } from "$lib/components/ui/button";
	import * as Markdown from "$lib/markdown";
	import CalendarIcon from "~icons/lucide/calendar-days";
	import MiddleDot from "~icons/lucide/dot";
	import GithubIcon from "~icons/lucide/github";
	import TagsIcon from "~icons/lucide/tags";
	import ShareMenu from "./ShareMenu.svelte";

	let { data, children } = $props();
	let { post } = $derived(data);
</script>

<svelte:head>
	<Metadata title="TheOnlyTails • {post.title}" description={post.description} />
</svelte:head>

<article class="flex flex-col gap-4 p-4">
	<header class="flex items-center justify-between gap-4 flex-wrap">
		<Markdown.h1 class="max-md:text-center text-balance">
			{post.title}
		</Markdown.h1>

		<Button
			href="https://github.com/TheOnlyTails/theonlytails.com/blob/main/src/routes/blog/posts/{post.slug}/+page.md"
			target="_blank"
			variant="outline"
		>
			<GithubIcon />
			View Article Source
		</Button>
	</header>
	<div class="flex items-center max-md:flex-col max-md:!items-start gap-4 text-muted-foreground">
		<time datetime={post.date.replace(/\//g, "-")}>
			<CalendarIcon />
			Published on {post.date}
		</time>

		<MiddleDot class="max-md:!hidden" />

		<ul class="flex flex-wrap gap-4 items-center">
			<TagsIcon />
			{#each post.tags as tag}
				<li>
					<a href="/blog?tag={tag}">
						<Badge>{tag}</Badge>
					</a>
				</li>
			{/each}
		</ul>

		<MiddleDot class="max-md:!hidden" />

		<ShareMenu />
	</div>

	<main class="markdown">
		{@render children()}
	</main>
</article>
