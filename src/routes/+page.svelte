<script lang="ts">
  import { Metadata } from "$lib"
  import { Avatar, AvatarFallback, AvatarImage } from "$lib/components/ui/avatar"
  import { Button } from "$lib/components/ui/button"
  import { Card } from "$lib/components/ui/card"
  import CardContent from "$lib/components/ui/card/card-content.svelte"
  import CardDescription from "$lib/components/ui/card/card-description.svelte"
  import CardFooter from "$lib/components/ui/card/card-footer.svelte"
  import CardHeader from "$lib/components/ui/card/card-header.svelte"
  import CardTitle from "$lib/components/ui/card/card-title.svelte"
  import { Separator } from "$lib/components/ui/separator"
  import { Skeleton } from "$lib/components/ui/skeleton"
  import type { Project, Technology } from "$lib/data/types"
  import Navbar from "./Navbar.svelte"

  import ArrowRightIcon from "~icons/lucide/arrow-right"
  import SvelteIcon from "~icons/simple-icons/svelte"
  import TypescriptIcon from "~icons/simple-icons/typescript"
  import RustIcon from "~icons/simple-icons/rust"
  import KotlinIcon from "~icons/simple-icons/kotlin"

  const projects = [
    {
      name: "Fluent Svelte",
      href: "https://fluent-svelte.vercel.app/",
      description: "A faithful implementation of Microsoft's Fluent Design System in Svelte.",
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
  ] as const satisfies Readonly<Project[]>

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
      name: "Kotlin",
      icon: KotlinIcon,
      href: "https://kotlinlang.org/",
    },
  ] as const satisfies Readonly<Technology[]>
</script>

<svelte:head>
  <Metadata
    title="TheOnlyTails"
    description="TheOnlyTails' personal site and portfolio with all kinds of programming stuff."
  />
</svelte:head>

<Navbar />

<Separator />

<main class="flex-grow flex flex-col items-center gap-4 p-4">
  <header class="mb-6 mt-10">
    <h1 class="flex items-center gap-4 text-5xl text-primary sm:ml-auto">
      <Avatar class="h-12 w-12">
        <AvatarImage src="/favicon.svg" alt="TheOnlyTails avatar" />
        <AvatarFallback><Skeleton class="w-10 h-10 rounded-full" /></AvatarFallback>
      </Avatar>
      <a class="text-current font-semibold" href="/">TheOnlyTails</a>
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
        <Icon />
      </Button>
    {/each}
  </ul>

  <ul class="my-auto px-4 flex max-lg:flex-col gap-4">
    {#each projects as { href, name, description }}
      <li>
        <Card
          class="w-96 rounded-3xl bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 transition duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90 lg:bg-gradient-to-br"
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
      </li>
    {/each}
  </ul>
</main>
