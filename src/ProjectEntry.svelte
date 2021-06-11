<script lang="ts">
	export let name: string
	export let href: string
	export let description: string
</script>

<li class="project">
	<a {href}>{name}</a> - {@html description}
</li>

<style lang="scss">
	.project {
		padding: {
			top: 0.15em;
			right: 0.15em;
			bottom: 0.15em;
		}
	}
</style>