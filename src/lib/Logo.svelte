<script lang="ts">
	import { fade } from "svelte/transition"

	export let src: string
	export let alt = "TheOnlyTails logo"
	export let size = 32
	export let id = "logo"
</script>

<!--suppress RequiredAttributes, HtmlRequiredAltAttribute -->
<img {alt} {id} in:fade={{ duration: 300 }} {src} width={size}/>

<style lang="scss">
	// Makes the logo image circular
	#logo {
		border-radius: 50%;
		vertical-align: middle;
		user-select: none;
		aspect-ratio: 1 / 1;
		-webkit-user-drag: none;
	}
</style>