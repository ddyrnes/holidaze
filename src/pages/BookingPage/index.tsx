import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getVenueById } from "../../services/api";
import { createBooking } from "../../services/api/bookings";
import type { Venue } from "../../types/api.types";
import { Button, Spinner } from "../../components/ui";
import ErrorMessage from "../../components/ErrorMessage";
import { showError } from "../../utils";
import {
  Container,
  BackButton,
  Title,
  BookingGrid,
  VenueCard,
  VenueImage,
  VenueImagePlaceholder,
  VenueInfo,
  VenueName,
  VenueLocation,
  BookingForm,
  FormTitle,
  DateSummary,
  DateRow,
  GuestSelector,
  GuestLabel,
  GuestControls,
  GuestButton,
  GuestCount,
  GuestHint,
  Divider,
  PriceSummary,
  PriceRow,
  TotalRow,
  LoadingContainer,
  LoadingText,
} from "./BookingPage.styles";

interface LocationState {
  checkIn?: string;
  checkOut?: string;
}

function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guests, setGuests] = useState(1);

  const checkIn = state?.checkIn ? new Date(state.checkIn) : null;
  const checkOut = state?.checkOut ? new Date(state.checkOut) : null;

  useEffect(() => {
    const fetchVenue = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await getVenueById(id);
        setVenue(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load venue");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  useEffect(() => {
    if (!checkIn || !checkOut) {
      navigate(`/venues/${id}`, { replace: true });
    }
  }, [checkIn, checkOut, id, navigate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = venue ? venue.price * nights : 0;

  const formatLocation = (venue: Venue): string => {
    const parts = [venue.location?.city, venue.location?.country].filter(Boolean);
    return parts.join(", ") || "Location not specified";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !checkIn || !checkOut || !venue) return;

    setIsSubmitting(true);

    try {
      await createBooking({
        venueId: id,
        dateFrom: checkIn.toISOString(),
        dateTo: checkOut.toISOString(),
        guests,
      });

      navigate("/booking/confirmation", {
        state: {
          venueName: venue.name,
          venueImage: venue.media?.[0]?.url,
          venueImageAlt: venue.media?.[0]?.alt,
          checkIn: checkIn.toISOString(),
          checkOut: checkOut.toISOString(),
          guests,
          nights,
          totalPrice,
          pricePerNight: venue.price,
        },
        replace: true,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create booking";
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <Spinner />
          <LoadingText>Loading venue details...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (error || !venue) {
    return (
      <Container>
        <BackButton onClick={() => navigate(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </BackButton>
        <ErrorMessage
          message={error || "Venue not found"}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  if (!checkIn || !checkOut) {
    return null;
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(`/venues/${id}`)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to venue
      </BackButton>

      <Title>Complete your booking</Title>

      <BookingGrid>
        <VenueCard>
          <VenueImage>
            {venue.media?.[0]?.url ? (
              <img src={venue.media[0].url} alt={venue.media[0].alt || venue.name} />
            ) : (
              <VenueImagePlaceholder>No image available</VenueImagePlaceholder>
            )}
          </VenueImage>
          <VenueInfo>
            <VenueName>{venue.name}</VenueName>
            <VenueLocation>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {formatLocation(venue)}
            </VenueLocation>
          </VenueInfo>
        </VenueCard>

        <BookingForm onSubmit={handleSubmit}>
          <FormTitle>Booking details</FormTitle>

          <DateSummary>
            <DateRow>
              <span>Check-in</span>
              <span>{formatDate(checkIn)}</span>
            </DateRow>
            <DateRow>
              <span>Check-out</span>
              <span>{formatDate(checkOut)}</span>
            </DateRow>
            <DateRow>
              <span>Duration</span>
              <span>{nights} {nights === 1 ? "night" : "nights"}</span>
            </DateRow>
          </DateSummary>

          <GuestSelector>
            <GuestLabel htmlFor="guest-count">Number of guests</GuestLabel>
            <GuestControls>
              <GuestButton
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                disabled={guests <= 1}
                aria-label="Decrease guests"
              >
                -
              </GuestButton>
              <GuestCount id="guest-count">{guests}</GuestCount>
              <GuestButton
                type="button"
                onClick={() => setGuests((g) => Math.min(venue.maxGuests, g + 1))}
                disabled={guests >= venue.maxGuests}
                aria-label="Increase guests"
              >
                +
              </GuestButton>
            </GuestControls>
            <GuestHint>Maximum {venue.maxGuests} guests allowed</GuestHint>
          </GuestSelector>

          <Divider />

          <PriceSummary>
            <PriceRow>
              <span>${venue.price} x {nights} {nights === 1 ? "night" : "nights"}</span>
              <span>${totalPrice}</span>
            </PriceRow>
            <TotalRow>
              <span>Total</span>
              <span>${totalPrice}</span>
            </TotalRow>
          </PriceSummary>

          <Button type="submit" $fullWidth disabled={isSubmitting}>
            {isSubmitting ? "Confirming..." : "Confirm booking"}
          </Button>
        </BookingForm>
      </BookingGrid>
    </Container>
  );
}

export default BookingPage;
