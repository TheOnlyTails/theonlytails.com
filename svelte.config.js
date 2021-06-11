import { mdsvex } from "mdsvex"
import * as path from "path"
import { fileURLToPath } from "url"
import preprocess from "svelte-preprocess"

const dirname = path.resolve(fileURLToPath(import.meta.url), "../")

/** @type {import("@sveltejs/kit").Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  extensions: [".svelte", ".svelte.md"],

  preprocess: [
    preprocess(),
    mdsvex({
      extensions: [".svelte.md"],
      // This is where the layouts are defined
      layout: path.join(dirname, "./src/routes/blog/blog-post-layout.svelte"),

      smartypants: {
        dashes: "oldschool",
      },
    }),
  ],

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },
}