export const handle = async ({ request, resolve }) => {
    const response = await resolve(request);
    return {
        ...response,
        headers: {
            ...response.headers,
            "Accept-Encoding": "gzip, compress, br",
        },
    };
};
//# sourceMappingURL=hooks.js.map