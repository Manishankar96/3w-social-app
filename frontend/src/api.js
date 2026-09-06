const BASE_URL = "https://threew-social-app-r0l2.onrender.com";

const makeUrl = (url) => {
  if (url.startsWith("/api/")) {
    return `${BASE_URL}${url}`;
  }

  return `${BASE_URL}/api${url}`;
};

const API = {
  get: async (url, options = {}) => {
    const response = await fetch(makeUrl(url), {
      method: "GET",
      headers: {
        ...(options.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  },

  post: async (url, body, options = {}) => {
    const response = await fetch(makeUrl(url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  },

  put: async (url, body, options = {}) => {
    const response = await fetch(makeUrl(url), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  },

  delete: async (url, options = {}) => {
    const response = await fetch(makeUrl(url), {
      method: "DELETE",
      headers: {
        ...(options.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  },
};

export default API;