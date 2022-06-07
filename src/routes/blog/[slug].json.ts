import { dev } from "$app/env"
import { getPosts } from "$lib/data/posts"
import type { RequestHandler } from "./__types/[slug].json"

// noinspection JSUnusedGlobalSymbols
export const get: RequestHandler = async ({ params }) => {
  const posts = await getPosts(import.meta.glob(`./*.md`))
  const blogPost = posts.find((post) => post.metadata.slug + "@post" === params.slug)

  if (!blogPost) return {
    status: 404,
  }

  const isPublished = !dev ? blogPost.metadata.published : true

  // checks if the URL's slug is valid
  if (posts.map((post) => post.metadata.slug + "@post").includes(params.slug) && isPublished) {
    return {
      body: blogPost.metadata,
    }
  } else {
    return {
      status: 404,
    }
  }
}