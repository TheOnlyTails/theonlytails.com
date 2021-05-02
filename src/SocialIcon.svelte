<script lang="ts">
	export let title: string
	export let href: string
	export let style: string

	$: id = (title ? title : "Title not found").toLowerCase()
	$: src = `icons/${ id }.svg`
	$: alt = `the link to my ${ title ? title : "Title not found" } profile`
</script>

<a class="social" {href} {title}>
	<!--suppress HtmlRequiredAltAttribute, RequiredAttributes -->
	<img {alt} class="social" height={32} {id} {src} {style} width={32}>
</a>

<style lang="scss">
	a.social {
		margin: 0.5em;

		&:hover {
			text-decoration: none;
			background-color: transparent;
		}
	}

	img.social {
		transition: transform .2s;

		&:hover { transform: scale(0.76) }
	}
</style>