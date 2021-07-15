<script lang="ts">
	import { isDark, switchTheme } from "../theme"
</script>

<button
		aria-checked="true"
		aria-labelledby="theme-switch-label"
		id="theme-switch"
		on:click={switchTheme}
		role="switch"
		type="button"
>
	<!--suppress HtmlUnknownTarget -->
	<img
			alt="dark mode switch"
			aria-label="dark mode switch"
			height="32"
			id="theme-switch-label"
			role="switch"
			src={`/icons/${$isDark ? "dark" : "light"}_mode.svg`}
			width="32"
	/>
</button>

<style lang="scss">
	#theme-switch {
		margin-bottom: .75em;
		cursor: pointer;
		transition: img 0.5s ease;
		border: none;
		background-color: inherit;
		place-content: center end;
	}
</style>