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
		margin-right: .5rem;
		margin-bottom: .2rem;
	}
</style>