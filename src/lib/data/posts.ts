import type { BlogPost } from "$lib/data/types"

type Posts = Record<string, () => Promise<{ [p: string]: any }>>

export const getPosts = async (posts: Posts): Promise<BlogPost[]> => {
  let blog = []
  for (let path in posts) {
    blog.push(
      posts[path]().then(({ metadata }) => ({
        path: path
          .replace(/(?<=[\w-])@post\.md/gi, "") // remove file extension
          .replace(/\.(?=\/blog)/gi, ""), // remove leading dot
        metadata,
      })),
    )
  }

  return await Promise.all(blog)
}