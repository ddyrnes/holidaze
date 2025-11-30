import { API_BASE_URL, getHeaders } from "./constants";
import type { ApiError } from "../../types/api.types";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method?: HttpMethod;
  body?: unknown;
  requiresAuth?: boolean;
}

class ApiClient {
  async request<T>(
    endpoint: string,
    { method = "GET", body, requiresAuth = false }: FetchOptions = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = getHeaders(requiresAuth);

    const config: RequestInit = {
      method,
      headers,
    };

    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      const error: ApiError = data;
      throw new Error(error.errors?.[0]?.message || "An error occurred");
    }

    return data;
  }

  get<T>(endpoint: string, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", requiresAuth });
  }

  post<T>(endpoint: string, body: unknown, requiresAuth = false): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body,
      requiresAuth,
    });
  }

  put<T>(endpoint: string, body: unknown, requiresAuth = true): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body,
      requiresAuth,
    });
  }

  delete<T>(endpoint: string, requiresAuth = true): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE", requiresAuth });
  }
}

export const apiClient = new ApiClient();
