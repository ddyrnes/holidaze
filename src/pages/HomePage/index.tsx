import { useState, useEffect, useCallback } from "react";
import { getVenues, searchVenues } from "../../services/api";
import type { Venue } from "../../types/api.types";
import VenueList from "../../components/VenueList";
import SearchBar from "../../components/SearchBar";
import ErrorMessage from "../../components/ErrorMessage";
import { Button } from "../../components/ui";
import {
  Container,
  Hero,
  HeroTitle,
  HeroSubtitle,
  Section,
  SectionHeader,
  SectionTitle,
  VenueCount,
  LoadMoreWrapper,
} from "./HomePage.styles";

const VENUES_PER_PAGE = 24;

function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchVenues = async (page = 1, append = false) => {
    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      const response = await getVenues({ 
        limit: VENUES_PER_PAGE, 
        page,
        sort: "created", 
        sortOrder: "desc" 
      });
      
      if (append) {
        setVenues(prev => [...prev, ...response.data]);
      } else {
        setVenues(response.data);
      }
      
      setTotalCount(response.meta.totalCount);
      setCurrentPage(page);
      setHasMore(!response.meta.isLastPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load venues");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setHasMore(false);

    if (!query) {
      fetchVenues(1, false);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const response = await searchVenues(query);
      setVenues(response.data);
      setTotalCount(response.meta.totalCount);
      setHasMore(!response.meta.isLastPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleLoadMore = () => {
    fetchVenues(currentPage + 1, true);
  };

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
              {venues.length} of {totalCount} {totalCount === 1 ? "venue" : "venues"} {searchQuery ? "found" : ""}
            </VenueCount>
          )}
        </SectionHeader>

        {error ? (
          <ErrorMessage message={error} onRetry={searchQuery ? () => handleSearch(searchQuery) : () => fetchVenues()} />
        ) : (
          <>
            <VenueList venues={venues} isLoading={showLoading} />
            
            {hasMore && !showLoading && !searchQuery && (
              <LoadMoreWrapper>
                <Button 
                  $variant="secondary" 
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? "Loading..." : "Load More Venues"}
                </Button>
              </LoadMoreWrapper>
            )}
          </>
        )}
      </Section>
    </Container>
  );
}

export default HomePage;
