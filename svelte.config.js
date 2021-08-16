import { mdsvex } from "mdsvex"
import sveltePreprocess from "svelte-preprocess"
import vercel from "@sveltejs/adapter-vercel"
import remarkA11yEmoji from "@fec/remark-a11y-emoji"
import remarkAutolinkHeadings from "remark-autolink-headings"
import remarkGfm from "remark-gfm"
import remarkHint from "remark-hint"
import autoprefixer from "autoprefixer"

/** @type {import("@sveltejs/kit").Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  extensions: [".svelte", ".svx"],

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
      extensions: [".svx"],

      smartypants: {
        dashes: "oldschool",
      },

      remarkPlugins: [remarkA11yEmoji, remarkAutolinkHeadings, remarkGfm, remarkHint],
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