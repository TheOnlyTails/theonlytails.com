import type { RequestHandler } from "./$types"
import type { PostData } from "$lib/data/types"

export const GET: RequestHandler = async () => {
  const posts = import.meta.glob<PostData>(`./blog/*/+page.md`, { eager: true })

  const postUrls = Object.entries(posts)
    .map(([_, post]) => `<url><loc>https://www.theonlytails.com/blog/${post.slug}</loc></url>`)
    .join("\n")

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.theonlytails.com/</loc>
    </url>
    <url>
        <loc>https://www.theonlytails.com/blog</loc>
    </url>
    ${postUrls}
</urlset>`,
    {
      headers: {
        "Cache-Control": "max-age=0, s-maxage=3600",
        "Content-Type": "application/xml",
      },
    }
  )
}
