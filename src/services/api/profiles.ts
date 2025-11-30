import { apiClient } from "./client";
import { API_ENDPOINTS } from "./constants";
import type { User, Booking, Venue } from "../../types/api.types";

interface UpdateProfileData {
  bio?: string;
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
  venueManager?: boolean;
}

export const getProfile = async (name: string): Promise<{ data: User }> => {
  return apiClient.get<{ data: User }>(API_ENDPOINTS.profiles.single(name));
};

export const updateProfile = async (
  name: string,
  data: UpdateProfileData
): Promise<{ data: User }> => {
  return apiClient.put<{ data: User }>(API_ENDPOINTS.profiles.single(name), data);
};

export const getUserBookings = async (name: string): Promise<{ data: Booking[] }> => {
  return apiClient.get<{ data: Booking[] }>(
    `${API_ENDPOINTS.profiles.bookings(name)}?_venue=true`,
    true
  );
};

export const getUserVenues = async (name: string): Promise<{ data: Venue[] }> => {
  return apiClient.get<{ data: Venue[] }>(
    `${API_ENDPOINTS.profiles.venues(name)}?_bookings=true`,
    true
  );
};

