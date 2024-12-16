import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import remarkHint from "remark-hint";
import { codeToHtml } from "shiki";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors

	extensions: [".svelte", ".md"],

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extension: ".md",
			layout: "./src/lib/markdown/mdsvex.svelte",
			smartypants: {
				dashes: "oldschool",
				quotes: false,
			},

			remarkPlugins: [remarkA11yEmoji, remarkGfm, remarkHint, remarkGithub],
			rehypePlugins: [rehypeSlug, [rehypeExternalLinks, { target: "_blank" }]],
			highlight: {
				async highlighter(code, lang) {
					const highlightedCode = (
						await codeToHtml(code, { theme: "material-theme-palenight", lang })
					)
						.replace(/<pre ([^>]+)>/, "")
						.replace("</pre>", "");

					return `<Components.pre rawCode={\`${encodeURIComponent(highlightedCode)}\`} />`;
				},
			},
		}),
	],
	kit: {
		adapter: adapter(),
		alias: {
			"$lib/components": "src/lib/components",
			"$lib/utils": "src/lib/utils.svelte",
		},
	},
	vitePlugin: {
		inspector: true,
	},
};

export default config;
