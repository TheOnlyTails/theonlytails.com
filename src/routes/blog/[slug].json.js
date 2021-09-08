import { dev } from "$app/env"

const getPosts = async () => {
  const allPosts = import.meta.glob("./*.svx")
  let blog = []
  for (let path in allPosts) {
    blog.push(allPosts[path]().then(({ metadata }) => ({ path, metadata })))
  }
  const posts = await Promise.all(blog)
  return posts.filter((post) => (!dev ? post.metadata.published : true))
}
export const get = async ({ params }) => {
  const posts = await getPosts()
  const { slug } = params
  const blogPost = posts.find((post) => post.metadata.slug == slug)
  const isPublished = !dev ? blogPost.metadata.published : true
  // checks if the URL's slug is valid
  if (!posts.map((post) => post.metadata.slug).includes(slug) || !isPublished) {
    return {
      status: 404,
    }
  }
  return {
    body: blogPost.metadata,
  }
}
//# sourceMappingURL=%5Bslug%5D.json.js.map