<script lang="ts">
	import { Metadata } from "$lib";
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import { Card } from "$lib/components/ui/card";
	import CardContent from "$lib/components/ui/card/card-content.svelte";
	import CardDescription from "$lib/components/ui/card/card-description.svelte";
	import CardFooter from "$lib/components/ui/card/card-footer.svelte";
	import CardHeader from "$lib/components/ui/card/card-header.svelte";
	import CardTitle from "$lib/components/ui/card/card-title.svelte";
	import { Separator } from "$lib/components/ui/separator";
	import { Skeleton } from "$lib/components/ui/skeleton";
	import type { Project, Technology } from "$lib/data/types";
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

<main class="flex-grow flex flex-col items-center gap-4 p-4">
	<header class="mb-6 mt-10">
		<h1 class="flex items-center gap-4 text-5xl text-primary sm:ml-auto">
			<Avatar class="size-12">
				<AvatarImage src="/favicon.svg" alt="Shachar Zidon avatar" />
				<AvatarFallback><Skeleton class="size-10 rounded-full" /></AvatarFallback>
			</Avatar>
			<a class="text-current font-semibold" href="/">Shachar Zidon</a>
		</h1>
	</header>

	<p class="text-xl font-medium text-center">A curious fullstack programmer</p>

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
				<Icon class={name === "Gleam" ? "grayscale scale-125 -translate-y-0.5" : ""} />
			</Button>
		{/each}
	</ul>

	<ul class="my-auto px-4 flex max-lg:flex-col gap-4">
		{#each projects as project}
			<li>
				{@render projectCard(project)}
			</li>
		{/each}
	</ul>
</main>

{#snippet projectCard({ name, href, description }: Project)}
	<Card
		class="transition-transform motion-safe:hover:-translate-y-2 sm:w-96 rounded-3xl bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90 lg:bg-gradient-to-br"
	>
		<CardHeader>
			<CardTitle>{name}</CardTitle>
		</CardHeader>
		<CardContent>
			<CardDescription>
				{@html description}
			</CardDescription>
		</CardContent>
		<CardFooter>
			<Button variant="link" target="_blank" rel="noopener noreferrer" class="ml-auto" {href}>
				Check it out <ArrowRightIcon />
			</Button>
		</CardFooter>
	</Card>
{/snippet}
