export const load = async ({ url, parent }) => {
  return {
    tag: url.searchParams.get("tag") ?? undefined,
    ...(await parent()),
  }
}
