import { mdsvex } from "mdsvex"
import sveltePreprocess from "svelte-preprocess"
import vercel from "@sveltejs/adapter-vercel"
import remarkA11yEmoji from "@fec/remark-a11y-emoji"
import remarkSlug from "remark-slug"
import remarkGfm from "remark-gfm"
import remarkHint from "remark-hint"
import remarkGithub from "remark-github"
import remarkGemoji from "remark-gemoji"
import rehypeExternalLinks from "rehype-external-links"
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"
import mediaMinMax from "postcss-media-minmax"

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  extensions: [".svelte", ".svx"],

  preprocess: [
    sveltePreprocess({
      postcss: {
        plugins: [autoprefixer, cssnano, mediaMinMax],
      },
    }),
    mdsvex({
      extensions: [".svx"],

      smartypants: {
        dashes: "oldschool",
        quotes: false,
      },

      remarkPlugins: [
        remarkA11yEmoji,
        remarkSlug,
        remarkGfm,
        remarkHint,
        remarkGithub,
        remarkGemoji,
      ],
      rehypePlugins: [[rehypeExternalLinks, { target: "_blank" }]],
    }),
  ],

  kit: {
    trailingSlash: "ignore",
    adapter: vercel(),
  },
}

export default config
