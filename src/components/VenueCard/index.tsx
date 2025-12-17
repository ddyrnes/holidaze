import { useNavigate } from "react-router-dom";
import type { Venue } from "../../types/api.types";
import {
  Card,
  ImageWrapper,
  Image,
  PlaceholderImage,
  Content,
  Title,
  Location,
  Footer,
  Price,
  Rating,
  Meta,
  MetaItem,
} from "./VenueCard.styles";

interface VenueCardProps {
  venue: Venue;
}

function VenueCard({ venue }: VenueCardProps) {
  const navigate = useNavigate();
  const imageUrl = venue.media?.[0]?.url;
  const imageAlt = venue.media?.[0]?.alt || venue.name;

  const locationText = [venue.location?.city, venue.location?.country]
    .filter(Boolean)
    .join(", ");

  const handleClick = () => {
    navigate(`/venue/${venue.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <Card
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${venue.name}`}
    >
      <ImageWrapper>
        {imageUrl ? (
          <Image src={imageUrl} alt={imageAlt} loading="lazy" />
        ) : (
          <PlaceholderImage>No image</PlaceholderImage>
        )}
      </ImageWrapper>

      <Content>
        <Title>{venue.name}</Title>
        <Location>{locationText || "Location not specified"}</Location>

        <Footer>
          <Price>
            ${venue.price} <span>/ night</span>
          </Price>
          <Rating>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>{venue.rating > 0 ? venue.rating.toFixed(1) : "New"}</span>
          </Rating>
        </Footer>

        <Meta>
          <MetaItem $active={venue.meta?.wifi} title="WiFi">
            WiFi
          </MetaItem>
          <MetaItem $active={venue.meta?.parking} title="Parking">
            Parking
          </MetaItem>
          <MetaItem $active={venue.meta?.breakfast} title="Breakfast">
            Breakfast
          </MetaItem>
          <MetaItem $active={venue.meta?.pets} title="Pets allowed">
            Pets
          </MetaItem>
        </Meta>
      </Content>
    </Card>
  );
}

export default VenueCard;



