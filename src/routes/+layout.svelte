<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import "../app.css";

	let { children } = $props();
</script>

<ModeWatcher lightClassNames={["light"]} />

<div class="flex flex-col min-h-dvh">
{@render children()}
</div>