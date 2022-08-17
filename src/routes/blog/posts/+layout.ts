import type { PostData } from "$lib/data/types"
import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async ({ routeId }) => {
  const slug = routeId?.replace("blog/posts/", "")

  return {
    post: (await import(`./${slug}/+page.md`)).metadata as PostData
  }
}