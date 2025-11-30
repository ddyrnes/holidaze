import { apiClient } from "./client";
import { API_ENDPOINTS } from "./constants";
import type { Venue, PaginatedResponse } from "../../types/api.types";

interface VenueQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: "asc" | "desc";
  _owner?: boolean;
  _bookings?: boolean;
}

interface CreateVenueData {
  name: string;
  description: string;
  media?: Array<{
    url: string;
    alt: string;
  }>;
  price: number;
  maxGuests: number;
  meta?: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  location?: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    continent?: string;
    lat?: number;
    lng?: number;
  };
}

const buildQueryString = (params: VenueQueryParams): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export const getVenues = async (
  params: VenueQueryParams = {}
): Promise<PaginatedResponse<Venue>> => {
  const queryString = buildQueryString(params);
  return apiClient.get<PaginatedResponse<Venue>>(
    `${API_ENDPOINTS.venues.base}${queryString}`
  );
};

export const getVenueById = async (
  id: string,
  includeOwner = true,
  includeBookings = true
): Promise<{ data: Venue }> => {
  const params: VenueQueryParams = {
    _owner: includeOwner,
    _bookings: includeBookings,
  };
  const queryString = buildQueryString(params);
  return apiClient.get<{ data: Venue }>(
    `${API_ENDPOINTS.venues.single(id)}${queryString}`
  );
};

export const searchVenues = async (
  query: string
): Promise<PaginatedResponse<Venue>> => {
  return apiClient.get<PaginatedResponse<Venue>>(
    `${API_ENDPOINTS.venues.search}?q=${encodeURIComponent(query)}`
  );
};

export const createVenue = async (
  data: CreateVenueData
): Promise<{ data: Venue }> => {
  return apiClient.post<{ data: Venue }>(API_ENDPOINTS.venues.base, data, true);
};

export const updateVenue = async (
  id: string,
  data: Partial<CreateVenueData>
): Promise<{ data: Venue }> => {
  return apiClient.put<{ data: Venue }>(API_ENDPOINTS.venues.single(id), data);
};

export const deleteVenue = async (id: string): Promise<void> => {
  return apiClient.delete<void>(API_ENDPOINTS.venues.single(id));
};
