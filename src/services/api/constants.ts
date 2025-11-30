export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://v2.api.noroff.dev";
export const API_KEY = import.meta.env.VITE_API_KEY;

export const API_ENDPOINTS = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    createApiKey: "/auth/create-api-key",
  },
  venues: {
    base: "/holidaze/venues",
    single: (id: string) => `/holidaze/venues/${id}`,
    search: "/holidaze/venues/search",
  },
  bookings: {
    base: "/holidaze/bookings",
    single: (id: string) => `/holidaze/bookings/${id}`,
  },
  profiles: {
    base: "/holidaze/profiles",
    single: (name: string) => `/holidaze/profiles/${name}`,
    bookings: (name: string) => `/holidaze/profiles/${name}/bookings`,
    venues: (name: string) => `/holidaze/profiles/${name}/venues`,
  },
};

export const getHeaders = (includeAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (API_KEY) {
    headers["X-Noroff-API-Key"] = API_KEY;
  }

  if (includeAuth) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

