<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}

	let { title, description }: Props = $props();
</script>

<title>{title}</title>
<meta content={title} name="og:title" />
<meta content={title} name="twitter:title" />
<meta content={description} name="description" />
<meta content={description} name="og:description" />
<meta content={description} name="twitter:description" />
