import type { RequestHandler } from "@sveltejs/kit"
import { dev } from "$app/env"

export const get: RequestHandler = async () => {
  const allPosts = import.meta.glob("./blog/*.md")

  let blog = []
  for (let path in allPosts) {
    blog.push(allPosts[path]().then(({ metadata }) => ({ path, metadata })))
  }

  const posts = await Promise.all(blog)

  return {
    body: posts.filter((post) => (!dev ? post.metadata.published : true)),
  }
}