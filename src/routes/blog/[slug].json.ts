import { dev } from "$app/env"
import { getPosts } from "$lib/data/posts"

// noinspection JSUnusedGlobalSymbols
export const get = async ({ params }) => {
  const posts = await getPosts(import.meta.glob(`./*.svx`))
  const blogPost = posts.find((post) => post.metadata.slug === params.slug)
  const isPublished = !dev ? blogPost.metadata.published : true

  // checks if the URL's slug is valid
  if (posts.map((post) => post.metadata.slug).includes(params.slug) && isPublished) {
    return {
      body: blogPost.metadata,
    }
  } else {
    return {
      status: 404,
    }
  }
}