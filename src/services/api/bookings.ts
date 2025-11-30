import { apiClient } from "./client";
import { API_ENDPOINTS } from "./constants";
import type { Booking } from "../../types/api.types";

interface CreateBookingData {
  venueId: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
}

export const createBooking = async (
  data: CreateBookingData
): Promise<{ data: Booking }> => {
  return apiClient.post<{ data: Booking }>(
    API_ENDPOINTS.bookings.base,
    data,
    true
  );
};

export const getBookingById = async (
  id: string
): Promise<{ data: Booking }> => {
  return apiClient.get<{ data: Booking }>(
    `${API_ENDPOINTS.bookings.single(id)}?_customer=true&_venue=true`,
    true
  );
};

export const updateBooking = async (
  id: string,
  data: Partial<Omit<CreateBookingData, "venueId">>
): Promise<{ data: Booking }> => {
  return apiClient.put<{ data: Booking }>(
    API_ENDPOINTS.bookings.single(id),
    data
  );
};

export const deleteBooking = async (id: string): Promise<void> => {
  return apiClient.delete<void>(API_ENDPOINTS.bookings.single(id));
};
