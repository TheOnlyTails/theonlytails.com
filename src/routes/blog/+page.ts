export const load = async ({ url, parent }) => {
  let params: URLSearchParams | undefined
  try {
    params = url.searchParams
  } catch {
    params = undefined
  }

  return {
    tag: params?.get("tag") ?? undefined,
    ...(await parent()),
  }
}
