import { useState, useEffect } from "react";
import { getVenues } from "../../services/api";
import type { Venue } from "../../types/api.types";
import VenueList from "../../components/VenueList";
import ErrorMessage from "../../components/ErrorMessage";
import {
  Container,
  Hero,
  HeroTitle,
  HeroSubtitle,
  Section,
  SectionHeader,
  SectionTitle,
  VenueCount,
} from "./HomePage.styles";

function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchVenues = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getVenues({ limit: 24, sort: "created", sortOrder: "desc" });
      setVenues(response.data);
      setTotalCount(response.meta.totalCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load venues");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <Container>
      <Hero>
        <HeroTitle>Find your perfect stay</HeroTitle>
        <HeroSubtitle>
          Discover unique accommodations around the world, from cozy cabins to
          luxury villas.
        </HeroSubtitle>
      </Hero>

      <Section>
        <SectionHeader>
          <SectionTitle>Browse venues</SectionTitle>
          {!isLoading && !error && (
            <VenueCount>{totalCount} venues available</VenueCount>
          )}
        </SectionHeader>

        {error ? (
          <ErrorMessage message={error} onRetry={fetchVenues} />
        ) : (
          <VenueList venues={venues} isLoading={isLoading} />
        )}
      </Section>
    </Container>
  );
}

export default HomePage;
