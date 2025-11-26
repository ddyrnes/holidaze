import { useParams } from "react-router-dom";

function VenueDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Venue Detail</h1>
      <p>Viewing venue: {id}</p>
    </div>
  );
}

export default VenueDetailPage;

