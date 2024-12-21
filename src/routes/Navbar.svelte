<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import * as Tooltip from "$lib/components/ui/tooltip";

	import type { PostData } from "$lib/data/types";
	import AtSignIcon from "~icons/lucide/at-sign";
	import GithubIcon from "~icons/lucide/github";
	import TwitterIcon from "~icons/lucide/twitter";
	import BlueskyIcon from "~icons/tabler/brand-bluesky";
	import ClockIcon from "~icons/lucide/clock";

	interface Props {
		posts?: PostData[] | undefined;
	}

	let { posts = undefined }: Props = $props();

	let currentTime = $state(new Date());
	const inMyTimezone = $derived(
		currentTime.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
			timeZone: "Asia/Jerusalem",
		}),
	);

	$effect(() => {
		const clock = setInterval(() => {
			currentTime = new Date();
		}, 1000);

		return () => clearInterval(clock);
	});
</script>

<nav class="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 p-4 sm:p-2">
	<header>
		<h1 class="flex items-center gap-3 sm:gap-4 my-0">
			<Avatar class="size-8 sm:size-10">
				<AvatarImage src="/favicon.svg" alt="Shachar Zidon's avatar" />
				<AvatarFallback><Skeleton class="size-10 rounded-full" /></AvatarFallback>
			</Avatar>
			<a class="text-current font-semibold" href="/">Shachar Zidon</a>
		</h1>
	</header>

	<!-- {#if page.route.id === "/blog" && posts}
		<Input
			bind:value={$searchQuery}
			list="search-post-options"
			placeholder="Search for articles..."
			type="search"
			class="w-auto flex-1"
		/>
		<datalist id="search-post-options">
			{#each posts.map((item) => item.title) as postName}
				<option value={postName}></option>
			{/each}
		</datalist>
	{:else if page.route.id?.startsWith("/blog/posts/") || page.route.id === "/"}
		<Button variant="link" href="/blog/"><BookMarkedIcon /> Blog</Button>
	{/if} -->

	<div class="flex gap-2 items-center">
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger>
					<span class={buttonVariants({ variant: "ghost", size: "sm" })}>
						<ClockIcon class="size-4" />
						{inMyTimezone}
					</span>
				</Tooltip.Trigger>
				<Tooltip.Content
					>this is the time where i'm at! ({currentTime.toLocaleTimeString("en-US", {
						timeZoneName: "longOffset",
						timeZone: "Asia/Jerusalem",
					}).slice(-9)})
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
		<Button href="https://github.com/theonlytails" variant="ghost" size="icon">
			<GithubIcon class="size-4" />
		</Button>
		<Button href="https://twitter.com/the_only_tails" variant="ghost" size="icon">
			<TwitterIcon class="size-4" />
		</Button>
		<Button href="https://bsky.app/profile/theonlytails.com" variant="ghost" size="icon">
			<BlueskyIcon class="size-4" />
		</Button>
		<Button href="mailto:theonlytails@theonlytails.com" variant="ghost" size="icon">
			<AtSignIcon class="size-4" />
		</Button>
	</div>
</nav>
