import { mdsvex } from "mdsvex"
import sveltePreprocess from "svelte-preprocess"

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  extensions: [".svelte", ".svelte.md"],

  preprocess: [
    sveltePreprocess({
      defaults: {
        style: "scss",
      },
    }),
    mdsvex({
      extensions: [".svelte.md"],

      smartypants: {
        dashes: "oldschool",
      },
    }),
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    trailingSlash: "ignore",
  },
}