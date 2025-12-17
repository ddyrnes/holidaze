import type { Venue } from "../../types/api.types";
import VenueCard from "../VenueCard";
import { SkeletonBox, SkeletonLine, SkeletonImage } from "../ui";
import { Grid, EmptyState, SkeletonCard, SkeletonContent } from "./VenueList.styles";

interface VenueListProps {
  venues: Venue[];
  isLoading?: boolean;
  emptyMessage?: string;
}

function VenueListSkeleton() {
  return (
    <Grid>
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonCard key={index}>
          <SkeletonImage />
          <SkeletonContent>
            <SkeletonLine $width="80%" $height="20px" />
            <SkeletonLine $width="60%" />
            <SkeletonBox $width="40%" $height="24px" />
          </SkeletonContent>
        </SkeletonCard>
      ))}
    </Grid>
  );
}

function VenueList({
  venues,
  isLoading = false,
  emptyMessage = "No venues found",
}: VenueListProps) {
  if (isLoading) {
    return <VenueListSkeleton />;
  }

  if (venues.length === 0) {
    return (
      <Grid>
        <EmptyState>{emptyMessage}</EmptyState>
      </Grid>
    );
  }

  return (
    <Grid>
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </Grid>
  );
}

export default VenueList;

