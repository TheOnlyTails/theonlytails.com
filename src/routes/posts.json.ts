import { dev } from "$app/env"
import { getPosts } from "$lib/data/posts"
import type { RequestHandler } from "./__types/posts.json"

export const get: RequestHandler = async () => {
  return {
    body: (await getPosts(import.meta.glob(`./blog/*.md`))).filter((post) =>
      !dev ? post.metadata.published : true,
    ),
  }
}