import type { Component, Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type Project = {
	name: string;
	href: string;
	description: string;
};

export type Technology = {
	name: string;
	icon: Component<SvelteHTMLElements["svg"]> | Snippet;
	href: string;
};

export type PostData = {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	published: boolean;
};
