/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />

declare interface Project {
	name: string
	href: string
	description: string
}

declare interface BlogPost {
	path: string
	metadata: PostData
}

declare interface PostData {
	slug: string
	title: string
	author: string
	description: string
	date: string
	published: boolean
}