import { useParams } from "react-router-dom";

function BookingPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Book Venue</h1>
      <p>Booking form for venue: {id}</p>
    </div>
  );
}

export default BookingPage;

