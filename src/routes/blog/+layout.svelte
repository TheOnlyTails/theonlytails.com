<script lang="ts">
	import Navbar from "../Navbar.svelte";

	import { Metadata } from "$lib";
	import { Separator } from "$lib/components/ui/separator";

	let { data, children } = $props();
	let { posts } = $derived(data);
</script>

<svelte:head>
	<Metadata
		title="TheOnlyTails • Blog"
		description="TheOnlyTails' blog about all kinds of programming stuff"
	/>
	<meta content="blog" name="og:type" />
</svelte:head>

<Navbar {posts} />

<Separator />

{@render children()}
