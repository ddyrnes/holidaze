import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getVenueById } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import type { Venue } from "../../types/api.types";
import { Button } from "../../components/ui";
import { SkeletonBox, SkeletonLine } from "../../components/ui";
import ErrorMessage from "../../components/ErrorMessage";
import {
  Container,
  BackButton,
  ImageSection,
  MainImage,
  ThumbnailGrid,
  Thumbnail,
  PlaceholderImage,
  ContentGrid,
  MainContent,
  Header,
  Title,
  LocationText,
  Stats,
  Stat,
  Section,
  SectionTitle,
  Description,
  AmenitiesGrid,
  Amenity,
  OwnerCard,
  OwnerAvatar,
  OwnerInfo,
  OwnerName,
  OwnerLabel,
  Sidebar,
  BookingCard,
  PriceDisplay,
  Price,
  PriceLabel,
  BookingInfo,
  BookingInfoRow,
  SkeletonHeader,
  SkeletonStats,
  SkeletonAmenities,
} from "./VenueDetailPage.styles";

function VenueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [venue, setVenue] = useState<Venue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const formatLocation = (venue: Venue): string => {
    const parts = [venue.location?.city, venue.location?.country].filter(Boolean);
    return parts.join(", ") || "Location not specified";
  };

  if (isLoading) {
    return (
      <Container>
        <SkeletonLine $width="100px" $height="20px" />

        <ImageSection>
          <MainImage>
            <SkeletonBox $width="100%" $height="100%" />
          </MainImage>
          <ThumbnailGrid>
            <SkeletonBox $width="100%" $height="100%" />
            <SkeletonBox $width="100%" $height="100%" />
          </ThumbnailGrid>
        </ImageSection>

        <ContentGrid>
          <MainContent>
            <SkeletonHeader>
              <SkeletonLine $width="60%" $height="36px" />
              <SkeletonLine $width="40%" $height="20px" />
            </SkeletonHeader>

            <SkeletonStats>
              <SkeletonLine $width="80px" $height="20px" />
              <SkeletonLine $width="80px" $height="20px" />
              <SkeletonLine $width="80px" $height="20px" />
            </SkeletonStats>

            <Section>
              <SkeletonLine $width="120px" $height="24px" />
              <SkeletonLine $width="100%" $height="80px" />
            </Section>

            <Section>
              <SkeletonLine $width="120px" $height="24px" />
              <SkeletonAmenities>
                <SkeletonBox $width="100%" $height="48px" />
                <SkeletonBox $width="100%" $height="48px" />
                <SkeletonBox $width="100%" $height="48px" />
                <SkeletonBox $width="100%" $height="48px" />
              </SkeletonAmenities>
            </Section>
          </MainContent>

          <Sidebar>
            <SkeletonBox $width="100%" $height="200px" />
          </Sidebar>
        </ContentGrid>
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

  const currentImage = venue.media?.[selectedImageIndex];

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to venues
      </BackButton>

      <ImageSection>
        <MainImage>
          {currentImage ? (
            <img src={currentImage.url} alt={currentImage.alt || venue.name} />
          ) : (
            <PlaceholderImage>No images available</PlaceholderImage>
          )}
        </MainImage>

        {venue.media && venue.media.length > 1 && (
          <ThumbnailGrid>
            {venue.media.slice(0, 2).map((image, index) => (
              <Thumbnail
                key={index}
                $active={selectedImageIndex === index}
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img src={image.url} alt={image.alt || `${venue.name} ${index + 1}`} />
              </Thumbnail>
            ))}
          </ThumbnailGrid>
        )}
      </ImageSection>

      <ContentGrid>
        <MainContent>
          <Header>
            <Title>{venue.name}</Title>
            <LocationText>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {formatLocation(venue)}
            </LocationText>
          </Header>

          <Stats>
            <Stat>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {venue.rating > 0 ? venue.rating.toFixed(1) : "New"}
            </Stat>
            <Stat>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Up to {venue.maxGuests} guests
            </Stat>
          </Stats>

          <Section>
            <SectionTitle>About this place</SectionTitle>
            <Description>
              {venue.description || "No description provided."}
            </Description>
          </Section>

          <Section>
            <SectionTitle>Amenities</SectionTitle>
            <AmenitiesGrid>
              <Amenity $available={venue.meta?.wifi}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
                </svg>
                WiFi
              </Amenity>
              <Amenity $available={venue.meta?.parking}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
                </svg>
                Parking
              </Amenity>
              <Amenity $available={venue.meta?.breakfast}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
                </svg>
                Breakfast
              </Amenity>
              <Amenity $available={venue.meta?.pets}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="4" r="2" />
                  <circle cx="18" cy="8" r="2" />
                  <circle cx="20" cy="16" r="2" />
                  <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
                </svg>
                Pets allowed
              </Amenity>
            </AmenitiesGrid>
          </Section>

          {venue.owner && (
            <Section>
              <SectionTitle>Hosted by</SectionTitle>
              <OwnerCard>
                <OwnerAvatar>
                  {venue.owner.avatar?.url ? (
                    <img src={venue.owner.avatar.url} alt={venue.owner.avatar.alt || venue.owner.name} />
                  ) : (
                    <PlaceholderImage>
                      {venue.owner.name.charAt(0).toUpperCase()}
                    </PlaceholderImage>
                  )}
                </OwnerAvatar>
                <OwnerInfo>
                  <OwnerName>{venue.owner.name}</OwnerName>
                  <OwnerLabel>Venue Host</OwnerLabel>
                </OwnerInfo>
              </OwnerCard>
            </Section>
          )}
        </MainContent>

        <Sidebar>
          <BookingCard>
            <PriceDisplay>
              <Price>${venue.price}</Price>
              <PriceLabel>/ night</PriceLabel>
            </PriceDisplay>

            <BookingInfo>
              <BookingInfoRow>
                <span>Max guests</span>
                <span>{venue.maxGuests}</span>
              </BookingInfoRow>
              <BookingInfoRow>
                <span>Rating</span>
                <span>{venue.rating > 0 ? `${venue.rating.toFixed(1)} / 5` : "No ratings yet"}</span>
              </BookingInfoRow>
            </BookingInfo>

            {isAuthenticated ? (
              <Link to={`/venues/${venue.id}/book`} style={{ textDecoration: "none" }}>
                <Button $fullWidth>Book this venue</Button>
              </Link>
            ) : (
              <Link to="/login" state={{ from: `/venues/${venue.id}` }} style={{ textDecoration: "none" }}>
                <Button $fullWidth>Login to book</Button>
              </Link>
            )}
          </BookingCard>
        </Sidebar>
      </ContentGrid>
    </Container>
  );
}

export default VenueDetailPage;
