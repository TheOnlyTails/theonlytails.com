<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { Button } from "$lib/components/ui/button";
</script>

<main class="h-dvh flex flex-col justify-center items-center gap-4">
	<h1 class="font-semibold text-5xl">Error: Status Code {$page.status}</h1>
	<p class="font-medium">{$page.error?.message}</p>
	<Button variant="outline" href="/">Return Home</Button>
</main>
