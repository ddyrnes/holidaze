import { useState, useEffect, useCallback } from "react";
import { getVenues, searchVenues } from "../../services/api";
import type { Venue } from "../../types/api.types";
import VenueList from "../../components/VenueList";
import SearchBar from "../../components/SearchBar";
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
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);

    if (!query) {
      fetchVenues();
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await searchVenues(query);
      setVenues(response.data);
      setTotalCount(response.meta.totalCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    fetchVenues();
  }, []);

  const getSectionTitle = () => {
    if (searchQuery) {
      return `Results for "${searchQuery}"`;
    }
    return "Browse venues";
  };

  const showLoading = isLoading || isSearching;

  return (
    <Container>
      <Hero>
        <HeroTitle>Find your perfect stay</HeroTitle>
        <HeroSubtitle>
          Discover unique accommodations around the world, from cozy cabins to
          luxury villas.
        </HeroSubtitle>
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
      </Hero>

      <Section>
        <SectionHeader>
          <SectionTitle>{getSectionTitle()}</SectionTitle>
          {!showLoading && !error && (
            <VenueCount>
              {totalCount} {totalCount === 1 ? "venue" : "venues"} {searchQuery ? "found" : "available"}
            </VenueCount>
          )}
        </SectionHeader>

        {error ? (
          <ErrorMessage message={error} onRetry={searchQuery ? () => handleSearch(searchQuery) : fetchVenues} />
        ) : (
          <VenueList venues={venues} isLoading={showLoading} />
        )}
      </Section>
    </Container>
  );
}

export default HomePage;
