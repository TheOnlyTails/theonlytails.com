<script lang="ts">
	import { Metadata } from "$lib";
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import type { Project, Technology } from "$lib/data/types";
	import { cn } from "$lib/utils.svelte";
	import Navbar from "./Navbar.svelte";

	import ArrowRightIcon from "~icons/lucide/arrow-right";
	import KotlinIcon from "~icons/simple-icons/kotlin";
	import RustIcon from "~icons/simple-icons/rust";
	import SvelteIcon from "~icons/simple-icons/svelte";
	import TypescriptIcon from "~icons/simple-icons/typescript";
	import GleamIcon from "~icons/vscode-icons/file-type-gleam";

	const projects = [
		{
			name: "sona Linku & lipu Linku",
			href: "https://linku.la/",
			description:
				"A free and open-source dictionary project for Toki Pona, a human minimalist language.",
		},
		{
			name: "Files",
			href: "https://files.community/",
			description:
				"A website for Files, A modern file explorer that pushes the boundaries of the platform.",
		},
		{
			name: "theonlytails.com",
			href: "https://github.com/theonlytails/theonlytails.com",
			description: `<i>You're looking at it</i>. Built with SvelteKit, TypeScript, and SCSS.`,
		},
	] as const satisfies Readonly<Project[]>;

	const technologies = [
		{
			name: "Svelte",
			icon: SvelteIcon,
			href: "https://svelte.dev/",
		},
		{
			name: "TypeScript",
			icon: TypescriptIcon,
			href: "https://typescriptlang.org/",
		},
		{
			name: "Rust",
			icon: RustIcon,
			href: "https://www.rust-lang.org/",
		},
		{
			name: "Gleam",
			icon: GleamIcon,
			href: "https://gleam.run/",
		},
		{
			name: "Kotlin",
			icon: KotlinIcon,
			href: "https://kotlinlang.org/",
		},
	] as const satisfies Readonly<Technology[]>;
</script>

<svelte:head>
	<Metadata
		title="Shachar Zidon"
		description="Shachar Zidon's personal site and portfolio with all kinds of programming stuff."
	/>
</svelte:head>

<Navbar />

<Separator />

<main class="grow flex flex-col lg:justify-center items-center gap-6 p-6">
	<h1 class="flex items-center gap-4 text-5xl text-primary">
		<Avatar class="group size-12 hidden sm:block">
			<AvatarImage src="/favicon.svg" fetchpriority="high" alt="Shachar Zidon avatar" />
			<img
				class="transition-transform group-hover:-translate-y-10"
				src="/trans_flag_anim.gif"
				alt="a pixelated waving trans flag"
				fetchpriority="low"
				loading="lazy"
			/>
			<AvatarFallback><Skeleton class="size-10 rounded-full" /></AvatarFallback>
		</Avatar>
		<a class="font-semibold text-center" href="/">Shachar Zidon</a>
	</h1>

	<ul
		class="flex flex-col text-center sm:text-start sm:list-disc sm:list-outside gap-2 text-lg font-medium"
	>
		<li>A curious fullstack programmer</li>
		<li>she/her</li>

		<li>
			<img
				class="mx-auto sm:mx-0"
				src="https://badge.les.bi/88x31/trans/bi/75-degree/outset.svg"
				alt="trans bi"
				loading="lazy"
			/>
		</li>
	</ul>

	<ul class="flex gap-4">
		{#each technologies as { name, icon: Icon, href }}
			<Button
				{href}
				target="_blank"
				rel="noopener noreferrer"
				title={name}
				variant="ghost"
				size="icon"
			>
				<!-- a bit of a hack until Simple Icons add a gleam icon -->
				<Icon
					class={cn(name === "Gleam" && "grayscale brightness-125 scale-125 -translate-y-0.5")}
				/>
			</Button>
		{/each}
	</ul>

	<ul class="grid grid-cols-1 sm:grid-cols-3 gap-4">
		{#each projects as project}
			<li>
				{@render projectCard(project)}
			</li>
		{/each}
	</ul>
</main>

{#snippet projectCard({ name, href, description }: Project)}
	<Card.Root
		class="transition-transform motion-safe:hover:-translate-y-2 sm:w-96 rounded-3xl bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90 lg:bg-gradient-to-br"
	>
		<Card.Header>
			<Card.Title>{name}</Card.Title>
		</Card.Header>
		<Card.Content>
			<Card.Description>
				{@html description}
			</Card.Description>
		</Card.Content>
		<Card.Footer>
			<Button variant="link" target="_blank" rel="noopener noreferrer" class="ml-auto" {href}>
				Check it out <ArrowRightIcon />
			</Button>
		</Card.Footer>
	</Card.Root>
{/snippet}
