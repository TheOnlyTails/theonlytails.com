<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { Button } from "$lib/components/ui/button";
</script>

<main>
	<h1>Error: Status Code {$page.status}</h1>
	<p>{$page.error?.message}</p>
	<Button variant="outline" href="/">Return Home</Button>
</main>

<style lang="postcss">
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	h1 {
		color: var(--accent);
	}
</style>
