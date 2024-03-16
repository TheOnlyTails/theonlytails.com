import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import Icons from "unplugin-icons/vite";

const config: UserConfig = {
	plugins: [
		sveltekit(),
		Icons({
			compiler: "svelte",
			defaultStyle: `display: inline; height: 1rem; width: 1rem;`,
			defaultClass: "icon",
		}),
	],
	build: {
		cssMinify: "lightningcss",
	},
};

export default config;
