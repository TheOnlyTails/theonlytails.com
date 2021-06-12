<script lang="ts">
  import { fade } from "svelte/transition";

  export let src: string;
  export let alt = "TheOnlyTails logo";
  export let size = 32;
  export let id = "logo";
</script>

<!--suppress RequiredAttributes, HtmlRequiredAltAttribute -->
<img {alt} height={size} {id} {src} transition:fade={{ duration: 300 }} width={size}/>

<style lang="scss">
	// Makes the logo image circular
	#logo {
		vertical-align: middle;
		border-radius: 50%;
	}
</style>