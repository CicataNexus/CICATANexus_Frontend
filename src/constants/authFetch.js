export async function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem("token");

    const isFormData = options.body instanceof FormData;
    const isGetMethod = (options.method || "GET").toUpperCase() === "GET";

    const headers = {
        Authorization: `Bearer ${token}`,
        ...(isFormData || isGetMethod
            ? {}
            : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
    };

    return fetch(url, {
        ...options,
        headers,
    });
}
