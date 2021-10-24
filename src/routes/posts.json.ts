import { dev } from "$app/env"
import { getPosts } from "$lib/data/posts"

export const get = async () => {
  return {
    body: (await getPosts(import.meta.glob(`./blog/*.svx`))).filter((post) =>
      !dev ? post.metadata.published : true
    ),
  }
}