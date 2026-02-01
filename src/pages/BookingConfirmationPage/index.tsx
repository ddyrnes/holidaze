import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Button } from "../../components/ui";
import {
  Container,
  SuccessIcon,
  Title,
  Subtitle,
  BookingCard,
  VenueImage,
  VenueImagePlaceholder,
  BookingDetails,
  VenueName,
  DetailRow,
  TotalRow,
  ButtonGroup,
} from "./BookingConfirmationPage.styles";

interface BookingConfirmationState {
  venueName: string;
  venueImage?: string;
  venueImageAlt?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalPrice: number;
  pricePerNight: number;
}

function BookingConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as BookingConfirmationState | null;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Container>
      <SuccessIcon>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </SuccessIcon>

      <Title>Booking confirmed!</Title>
      <Subtitle>Your reservation has been successfully made.</Subtitle>

      <BookingCard>
        <VenueImage>
          {state.venueImage ? (
            <img src={state.venueImage} alt={state.venueImageAlt || state.venueName} />
          ) : (
            <VenueImagePlaceholder>No image available</VenueImagePlaceholder>
          )}
        </VenueImage>

        <BookingDetails>
          <VenueName>{state.venueName}</VenueName>

          <DetailRow>
            <span>Check-in</span>
            <span>{formatDate(state.checkIn)}</span>
          </DetailRow>

          <DetailRow>
            <span>Check-out</span>
            <span>{formatDate(state.checkOut)}</span>
          </DetailRow>

          <DetailRow>
            <span>Guests</span>
            <span>{state.guests} {state.guests === 1 ? "guest" : "guests"}</span>
          </DetailRow>

          <DetailRow>
            <span>Duration</span>
            <span>{state.nights} {state.nights === 1 ? "night" : "nights"}</span>
          </DetailRow>

          <DetailRow>
            <span>Price per night</span>
            <span>${state.pricePerNight}</span>
          </DetailRow>

          <TotalRow>
            <span>Total paid</span>
            <span>${state.totalPrice}</span>
          </TotalRow>
        </BookingDetails>
      </BookingCard>

      <ButtonGroup>
        <Button $variant="cta" onClick={() => navigate("/profile")}>
          View my bookings
        </Button>
        <Button $variant="secondary" onClick={() => navigate("/")}>
          Browse more venues
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default BookingConfirmationPage;
