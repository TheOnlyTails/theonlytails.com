<script context="module" lang="ts">

	const slugRegex = /^\d{3}-([a-z-]+)\.svx$/

	/**
	 * @type {import("@sveltejs/kit").Load}
	 */
	export async function load({ page, session }) {
		const { slug } = page.params
		/**
		 * @type { { title: string, description: string, filename: string }[] }
		 */
		const pages = session.pages
		const slugs = pages.map((page) => [page.filename.match(slugRegex)[1], page])

		if (slug in slugs) {
			const pages = await Promise.all(
					import.meta.glob("/src/pages/*.svx").map(async ([path, page]) => {
						const filename = path.split("/").pop()
						const slug = filename.match(slugRegex)[1]
						return [slug, page]
					})
			)

			const { default: rendered } = await pages[slug]()
			return {
				props: {
					title: slugs[slug].title,
					description: slugs[slug].description,
					Rendered: rendered,
				},
			}
		} else {
			// not found
			return {
				status: 404,
				error: new Error("Not found"),
			}
		}
	}
</script>

<script lang="ts">
	export let title: string
	export let description: string
	export let rendered: any
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div id="article">
	{rendered}
</div>

<style lang="scss">
	#article {
		align-self: flex-start;
		justify-content: flex-start;
		margin-left: 5rem;
		padding-bottom: 5rem;
	}
</style>