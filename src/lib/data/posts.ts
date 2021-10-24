type Posts = Record<string, () => Promise<{ [p: string]: any }>>

export const getPosts: (pathToPosts: Posts) => Promise<BlogPost[]> = async (posts: Posts) => {
  let blog = []
  for (let path in posts) {
    blog.push(
      posts[path]().then(({ metadata }) => ({
        path: path
          .replace(/(?<=[\w-])\.svx/gi, "") // remove file extension
          .replace(/\.(?=\/blog)/gi, ""), // remove leading dot
        metadata,
      }))
    )
  }

  return await Promise.all(blog)
}