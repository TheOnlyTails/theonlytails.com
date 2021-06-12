import { dev } from "$app/env";
export const slugFromPath = (path) => path.match(/([\w-]+)\.(svelte\.md)/i)?.[1] ?? null;
export const get = async ({ query }) => {
    const modules = import.meta.glob("./pages/*.svelte.md");
    const postPromises = [];
    const limit = Number(query.get("limit") ?? Infinity);
    if (Number.isNaN(limit)) {
        return {
            status: 400,
        };
    }
    for (let [path, resolver] of Object.entries(modules)) {
        const slug = slugFromPath(path);
        const promise = resolver().then((post) => ({
            slug,
            ...post.metadata,
        }));
        postPromises.push(promise);
    }
    const posts = await Promise.all(postPromises);
    const publishedPosts = posts.filter((post) => post.published).slice(0, limit);
    publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
    posts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
    return {
        body: !dev ? publishedPosts.slice(0, limit) : posts,
    };
};
//# sourceMappingURL=posts.json.js.map