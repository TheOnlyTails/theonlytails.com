<script lang="ts">
	import { page } from "$app/state";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger,
	} from "$lib/components/ui/dropdown-menu";
	import LinkIcon from "~icons/lucide/link";
	import ShareVariantIcon from "~icons/lucide/share";
	import ShareIcon from "~icons/lucide/share-2";
	import TwitterIcon from "~icons/lucide/twitter";
</script>

<DropdownMenu>
	<DropdownMenuTrigger class={buttonVariants({ variant: "outline" })}>
		<ShareIcon /> Share Post
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		<DropdownMenuItem>
			<Button
				size="sm"
				variant="link"
				href="https://twitter.com/intent/tweet?text={encodeURIComponent(
					'Check out this blog post: ' + page.url,
				)}"
				target="_blank"
				rel="noopener noreferrer"
			>
				<TwitterIcon /> Twitter
			</Button>
		</DropdownMenuItem>
		<DropdownMenuItem>
			<Button
				size="sm"
				variant="link"
				onclick={() => navigator.clipboard.writeText(page.url.toString())}
			>
				<LinkIcon /> Copy Link
			</Button>
		</DropdownMenuItem>
		{#if navigator.share}
			<DropdownMenuItem>
				<Button
					size="sm"
					variant="link"
					onclick={() => navigator.share({ url: page.url.toString() })}
				>
					<ShareVariantIcon /> OS Sharing
				</Button>
			</DropdownMenuItem>
		{/if}
	</DropdownMenuContent>
</DropdownMenu>
