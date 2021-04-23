<script lang="ts">
    export let name: string
    export let href: string
</script>

<li class="projects">
		<a {href}>{name}</a>
		-
		<slot/>
</li>