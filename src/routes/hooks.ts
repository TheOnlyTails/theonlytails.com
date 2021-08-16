import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ request, resolve }) => {
  const response = await resolve(request)

  return {
    ...response,
    headers: {
      ...response.headers,
      "Accept-Encoding": "gzip, compress, br",
    },
  }
}