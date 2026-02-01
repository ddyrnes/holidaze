import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserVenues } from "../../services/api/profiles";
import type { Venue, Booking } from "../../types/api.types";
import { Button, Spinner } from "../../components/ui";
import ErrorMessage from "../../components/ErrorMessage";
import { showError } from "../../utils";
import {
  Container,
  Header,
  Title,
  VenueCount,
  EmptyState,
  EmptyTitle,
  EmptyText,
  VenuesList,
  VenueCard,
  VenueHeader,
  VenueImage,
  VenueImagePlaceholder,
  VenueInfo,
  VenueName,
  VenueMeta,
  VenueMetaItem,
  VenueActions,
  ActionButton,
  BookingsSection,
  BookingsHeader,
  BookingsBadge,
  Chevron,
  BookingsList,
  BookingItem,
  BookingCustomer,
  CustomerAvatar,
  CustomerName,
  BookingDetails,
  BookingDetail,
  BookingStatus,
  NoBookings,
  LoadingContainer,
  LoadingText,
} from "./ManagerVenuesPage.styles";

function ManagerVenuesPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedVenues, setExpandedVenues] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchVenues = async () => {
      if (!user) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await getUserVenues(user.name);
        setVenues(response.data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load venues";
        setError(message);
        showError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenues();
  }, [user]);

  const toggleBookings = (venueId: string) => {
    setExpandedVenues((prev) => {
      const next = new Set(prev);
      if (next.has(venueId)) {
        next.delete(venueId);
      } else {
        next.add(venueId);
      }
      return next;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatLocation = (venue: Venue): string => {
    const parts = [venue.location?.city, venue.location?.country].filter(Boolean);
    return parts.join(", ") || "No location";
  };

  const isUpcomingBooking = (booking: Booking) => {
    return new Date(booking.dateTo) >= new Date();
  };

  const sortBookings = (bookings: Booking[]) => {
    return [...bookings].sort((a, b) => {
      const aIsUpcoming = isUpcomingBooking(a);
      const bIsUpcoming = isUpcomingBooking(b);
      if (aIsUpcoming !== bIsUpcoming) return aIsUpcoming ? -1 : 1;
      return new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime();
    });
  };

  const getUpcomingCount = (bookings: Booking[] = []) => {
    return bookings.filter(isUpcomingBooking).length;
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <Spinner />
          <LoadingText>Loading your venues...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          My Venues
          <VenueCount>({venues.length})</VenueCount>
        </Title>
        <Button $variant="cta" onClick={() => navigate("/manager/venues/create")}>
          Create New Venue
        </Button>
      </Header>

      {venues.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No venues yet</EmptyTitle>
          <EmptyText>Create your first venue to start accepting bookings.</EmptyText>
          <Button $variant="cta" onClick={() => navigate("/manager/venues/create")}>
            Create Your First Venue
          </Button>
        </EmptyState>
      ) : (
        <VenuesList>
          {venues.map((venue) => {
            const isExpanded = expandedVenues.has(venue.id);
            const bookings = venue.bookings || [];
            const upcomingCount = getUpcomingCount(bookings);

            return (
              <VenueCard key={venue.id}>
                <VenueHeader>
                  <VenueImage>
                    {venue.media?.[0]?.url ? (
                      <img src={venue.media[0].url} alt={venue.media[0].alt || venue.name} />
                    ) : (
                      <VenueImagePlaceholder>No image</VenueImagePlaceholder>
                    )}
                  </VenueImage>

                  <VenueInfo>
                    <VenueName>{venue.name}</VenueName>
                    <VenueMeta>
                      <VenueMetaItem>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {formatLocation(venue)}
                      </VenueMetaItem>
                      <VenueMetaItem>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                        </svg>
                        Up to {venue.maxGuests} guests
                      </VenueMetaItem>
                      <VenueMetaItem>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="1" x2="12" y2="23" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        ${venue.price}/night
                      </VenueMetaItem>
                    </VenueMeta>

                    <VenueActions>
                      <ActionButton onClick={() => navigate(`/venues/${venue.id}`)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        View
                      </ActionButton>
                      <ActionButton onClick={() => navigate(`/manager/venues/${venue.id}/edit`)}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </ActionButton>
                    </VenueActions>
                  </VenueInfo>
                </VenueHeader>

                <BookingsSection>
                  <BookingsHeader
                    onClick={() => toggleBookings(venue.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`bookings-${venue.id}`}
                  >
                    <span>
                      Bookings
                      {upcomingCount > 0 && (
                        <BookingsBadge>{upcomingCount} upcoming</BookingsBadge>
                      )}
                    </span>
                    <Chevron $isOpen={isExpanded}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </Chevron>
                  </BookingsHeader>

                  {isExpanded && (
                    <div id={`bookings-${venue.id}`}>
                      {bookings.length === 0 ? (
                        <NoBookings>No bookings for this venue yet.</NoBookings>
                      ) : (
                        <BookingsList>
                          {sortBookings(bookings).map((booking) => (
                            <BookingItem key={booking.id}>
                              <BookingCustomer>
                                <CustomerAvatar>
                                  {booking.customer?.avatar?.url ? (
                                    <img
                                      src={booking.customer.avatar.url}
                                      alt={booking.customer.avatar.alt || booking.customer.name}
                                    />
                                  ) : (
                                    booking.customer?.name?.charAt(0).toUpperCase() || "?"
                                  )}
                                </CustomerAvatar>
                                <CustomerName>
                                  {booking.customer?.name || "Unknown"}
                                </CustomerName>
                              </BookingCustomer>

                              <BookingDetails>
                                <BookingDetail>
                                  <strong>{formatDate(booking.dateFrom)}</strong> - <strong>{formatDate(booking.dateTo)}</strong>
                                </BookingDetail>
                                <BookingDetail>
                                  {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                                </BookingDetail>
                              </BookingDetails>

                              <BookingStatus $isUpcoming={isUpcomingBooking(booking)}>
                                {isUpcomingBooking(booking) ? "Upcoming" : "Completed"}
                              </BookingStatus>
                            </BookingItem>
                          ))}
                        </BookingsList>
                      )}
                    </div>
                  )}
                </BookingsSection>
              </VenueCard>
            );
          })}
        </VenuesList>
      )}
    </Container>
  );
}

export default ManagerVenuesPage;
