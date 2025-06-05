const baseUrl = `http://${import.meta.env.VITE_SERVER_IP}/v1`;

export const apiFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(`${baseUrl}${url}`, config);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error = new Error(errorData.message || "Error en la solicitud");
        error.status = response.status;
        throw error;
    }

    return response.json();
};
