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
				text-decoration: none;
				background-color: transparent;
			}
		}

		img {
			transition: all 0.5s ease;
			filter: invert(0%);

			&.invertDark {
				filter: invert(100%);
			}

			&.social {
				transition: transform 0.2s;

				&:hover {
					transform: scale(0.76);
				}
			}
		}
	}
</style>