<script lang="ts">
	export let title: string = undefined
	export let href: string
	export let style = ""
	export let invertDark = false

	const id = (title ?? "Title not found").toLowerCase()
	const src = `icons/${ id }.svg`
	const alt = `the link to my ${ title ?? "Title not found" } profile`
</script>

<a class="social" {href} {title}>
	<!--suppress HtmlRequiredAltAttribute, RequiredAttributes -->
	<img {alt} class="social" class:invertDark height={32} {id} {src} {style} width={32}/>
</a>

<style lang="scss">
	a {
		&.social {
			margin: 0.5em;

			&:hover {
				background-color: transparent;
				text-decoration: none;
			}
		}

		img {
			width: 2rem;
			transition: filter 0.5s ease;
			aspect-ratio: 1 / 1;

			&.invertDark { filter: invert(100%) }

			@media (prefers-reduced-motion: no-preference) {
				&.social {
					transition: transform 0.2s;

					&:hover { transform: scale(0.76) }
				}
			}
		}
	}
</style>