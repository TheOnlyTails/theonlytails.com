<script lang="ts">
    export let name: string
    export let href: string
    export let description: string
</script>

<li class="projects">
	<a {href}>{name}</a> - {@html description}
</li>