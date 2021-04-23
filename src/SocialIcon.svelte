<script lang="ts">
    export let href: string;
    export let title: string;
    export let size = 32;
    export let style = ""

    $: id = (title ? title : "Title not found").toLowerCase()
    $: src = `icons/${ id }.svg`;
    $: alt = `the link to my ${ (title ? title : "Title not found") } profile`
</script>

<a class="social" {href} {title}>
		<!--suppress HtmlRequiredAltAttribute, RequiredAttributes -->
		<img {alt} class="social" height={size} {id} {src} {style} width={size}>
</a>