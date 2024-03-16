<script lang="ts">
	import { onNavigate } from "$app/navigation";
	import "../app.postcss";

	onNavigate(async (nav) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await nav.complete;
			});
		});
	});
</script>

<slot />
