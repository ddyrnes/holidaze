import { useParams } from "react-router-dom";

function EditVenuePage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Venue</h1>
      <p>Edit venue: {id}</p>
    </div>
  );
}

export default EditVenuePage;

