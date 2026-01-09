import { API_BASE_URL, getHeaders } from "./constants";
import type { ApiError as ApiErrorType } from "../../types/api.types";
import { ApiError } from "../../utils/ApiError";

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

    if (!response.ok) {
      let errorData: ApiErrorType = { errors: [], status: "", statusCode: 0 };
      try {
        errorData = await response.json();
      } catch {
        // Silent catch - response may not be JSON
      }
      throw new ApiError(response.status, response.statusText, errorData.errors);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const data = await response.json();
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
