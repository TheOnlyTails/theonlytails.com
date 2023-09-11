import { dev } from "$app/environment"
import type { PostData } from "$lib/data/types"

export const load = async () => {
  const posts = import.meta.glob<PostData>("./posts/*/+page.md", {
    eager: true,
    import: "metadata",
  })

  return {
    posts: Object.entries(posts)
      .filter(([_, post]) => (!dev ? post.published : true)) // filter for published posts
      .map(([_, post]) => post), // remove path
  }
}
