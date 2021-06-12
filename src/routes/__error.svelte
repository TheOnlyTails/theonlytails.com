<script context="module">
  export const load = ({ error, status }) => ({
    props: {
      title: `${status}: ${error.message}`
    }
  });
</script>

<script>
  import { isDark } from "../stores/theme";
  import { goto } from "$app/navigation";

  export let title;

  const goBack = () => goto("/");
</script>

<h2 class:isLight={!$isDark}>{title}</h2>
<button class="back" class:isLight={!$isDark} on:click={goBack}>Return Home</button>

<style lang="scss">
	@use "static/style/style";

	h2 {
		color: style.$light-accent;

		&.isLight { color: style.$dark-accent }
	}

	.back {
		font-family: jetbrains-mono, "Fira Code", monospace;;
		font-size: x-large;
		padding: .5rem;
		cursor: pointer;
		color: style.$light-accent;
		border: .2rem style.$light-accent outset;
		outline: none;
		background: transparent;

		&.isLight { color: style.$dark-accent }
	}
</style>