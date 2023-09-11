import remarkA11yEmoji from "@fec/remark-a11y-emoji"
import adapter from "@sveltejs/adapter-vercel"
import { vitePreprocess } from "@sveltejs/kit/vite"
import { mdsvex } from "mdsvex"
import rehypeExternalLinks from "rehype-external-links"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkGithub from "remark-github"
import remarkHint from "remark-hint"
import { getHighlighter } from "shiki"
import { readFileSync } from "node:fs"

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
          /** @type {Record<string, import("shiki").Lang>} */
          const langAliases = {
            kt: "kotlin",
          }

          const highlighter = await getHighlighter({
            theme: JSON.parse(readFileSync("./themes/dark.json", "utf-8")),
          })
          return highlighter
            .codeToHtml(code, {
              lang: langAliases[lang] ?? lang,
            })
            .replace(/{/g, "&lcub;")
            .replace(/<pre ([^>]+)>/, "<Components.pre>")
            .replace("</pre>", "</Components.pre>")
        },
      },
    }),
  ],

  kit: {
    adapter: adapter({ runtime: "edge" }),
    alias: {
      "$lib/components": "src/lib/components",
      "$lib/utils": "src/lib/utils",
    },
  },
  vitePlugin: {
    inspector: true,
  },
}

export default config
