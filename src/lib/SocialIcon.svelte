<script lang="ts">
  export let title: string = undefined
  export let href: string
  export let style = ""

  $: id = (title ?? "Title not found").toLowerCase()
</script>

<a class="social" {href} {title}>
  <img alt="the link to my {title ?? 'Title not found'} profile"
       class="social"
       height={32}
       {id}
       src="icons/{id}.svg"
       {style}
       width={32}
  />
</a>

<style lang="scss">
	a.social {
		margin: 0.5em;

		&:hover {
			background-color: transparent;
			text-decoration: none;
		}

		img.social {
			width: 2rem;
			transition: filter 0.5s ease;
			aspect-ratio: 1 / 1;

			@media (prefers-reduced-motion: no-preference) {
				transition: transform 0.2s;

				&:hover { transform: scale(0.76) }
			}
		}
	}
</style>