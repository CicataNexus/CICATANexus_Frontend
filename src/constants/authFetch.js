export async function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Authorization": `Bearer ${token}`,
        ...options.headers,
    };

    const isFormData = options.body instanceof FormData;
    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    return fetch(url, {
        ...options,
        headers,
    });
}
