import { mdsvex } from "mdsvex"
import sveltePreprocess from "svelte-preprocess"
import vercel from "@sveltejs/adapter-vercel"

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  extensions: [".svelte", ".svx"],

  preprocess: [
    sveltePreprocess({
      defaults: {
        style: "scss",
      },
    }),
    mdsvex({
      extensions: [".svx"],

      smartypants: {
        dashes: "oldschool",
      },
    }),
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    trailingSlash: "ignore",
    adapter: vercel(),
  },
}