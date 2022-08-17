import type { PostData } from "$lib/data/types"
import type { PageLoad } from "./$types"
import { dev } from "$app/env"

export const load: PageLoad = async () => {
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
