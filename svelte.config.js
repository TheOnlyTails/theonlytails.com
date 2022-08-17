import { mdsvex } from "mdsvex"
import sveltePreprocess from "svelte-preprocess"
import adapter from "@sveltejs/adapter-auto"
import remarkA11yEmoji from "@fec/remark-a11y-emoji"
import remarkGfm from "remark-gfm"
import remarkHint from "remark-hint"
import remarkGithub from "remark-github"
import rehypeExternalLinks from "rehype-external-links"
import rehypeSlug from "rehype-slug"
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"
import mediaMinMax from "postcss-media-minmax"

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  extensions: [".svelte", ".md"],

  preprocess: [
    sveltePreprocess({
      postcss: {
        plugins: [autoprefixer, cssnano, mediaMinMax],
      },
    }),
    mdsvex({
      extension: ".md",

      smartypants: {
        dashes: "oldschool",
        quotes: false,
      },

      remarkPlugins: [
        remarkA11yEmoji,
        remarkGfm,
        remarkHint,
        remarkGithub,
      ],
      rehypePlugins: [rehypeSlug, [rehypeExternalLinks, { target: "_blank" }]],
    }),
  ],

  kit: {
    trailingSlash: "ignore",
    adapter: adapter(),
  },
}

export default config
