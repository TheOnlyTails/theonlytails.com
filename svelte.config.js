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

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  extensions: [".svelte", ".md"],

  preprocess: [
    sveltePreprocess({
      scss: {
        outputStyle: "compressed",
        postcss: {
          plugins: [autoprefixer],
        },
      },
    }),
    mdsvex({
      extensions: [".md"],

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
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            target: "_blank",
          },
        ],
      ],
    }),
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    trailingSlash: "ignore",
    adapter: vercel(),
  },
}

export default config