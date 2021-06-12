<script context="module" lang="ts">
  /**
   * @type {import("@sveltejs/kit").Load}
   */
  interface BlogPost {
    slug: string
    title: string
    author: string
    description: string
    date: string,
    published: boolean
  }

  export async function load({ page, fetch }) {
    const post: BlogPost = await fetch(`/blog/${ page.params.slug }.json`).then(res => res.json());
    if (!post || !post.published) {
      return {
        status: 404,
        error: new Error("Post could not be found")
      };
    }
    return {
      props: {
        post
      }
    };
  }
</script>

<script lang="ts">
  export let post: BlogPost;
</script>

<h1>{post.title}</h1>