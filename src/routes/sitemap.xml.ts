import type { RequestHandler } from "@sveltejs/kit"
import { getPosts } from "$lib/data/posts"

export const get: RequestHandler = async () => {
  const posts = await getPosts(import.meta.glob(`./blog/*.svx`))

  const postUrls = posts
    .map((post) => {
      return `
		<url>
        <loc>https://www.theonlytails.com/${post.path}</loc>
    </url>
`
    })
    .join("\n")

  return {
    headers: {
      "Cache-Control": "max-age=0, s-maxage=3600",
      "Content-Type": "application/xml",
    },
    body: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.theonlytails.com/</loc>
    </url>
    <url>
        <loc>https://www.theonlytails.com/blog</loc>
    </url>
    ${postUrls}
</urlset>`,
  }
}