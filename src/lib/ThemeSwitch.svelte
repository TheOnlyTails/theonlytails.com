<script lang="ts">
	import { isDark, switchTheme } from "$lib/data/theme"
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
			class:isLight={!$isDark}
			id="theme-switch-label"
			src="/icons/{$isDark ? 'dark' : 'light'}_mode.svg"
	/>
</button>

<style lang="scss">
	@use "static/style/vars";
	@use "static/style/mixins";

	#theme-switch {
		max-width: fit-content;
		padding-bottom: .75em;
		cursor: pointer;
		transition: img 0.5s ease;
		border: none;
		border-radius: 50%;
		background: inherit;
		place-self: center;

		#theme-switch-label {
			width: 2rem;
			padding: .15rem;
			transition: background-color 0.5s ease;
			border-radius: 50%;
			background: lighten(vars.$dark-color, 13%);
			aspect-ratio: 1 / 1;

			&:hover { background: lighten(vars.$dark-color, 5%) }

			&.isLight {
				background: lighten(vars.$dark-color, 75%);

				&:hover {
					background: lighten(vars.$dark-color, 95%);
				}
			}
		}
	}
</style>