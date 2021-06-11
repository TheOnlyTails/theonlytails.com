import { mdsvex } from "mdsvex"
import * as path from "path"
import { fileURLToPath } from "url"

const dirname = path.resolve(fileURLToPath(import.meta.url), "../")

/** @type {import("@sveltejs/kit").Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors

  extensions: [".svelte", ".svx"],

  preprocess: mdsvex({
    extensions: [".svelte.md"],
    // This is where the layouts are defined
    layout: {
      blog: path.join(dirname, "src/routes/blog/_layout.svelte"),
    },
  }),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },
}