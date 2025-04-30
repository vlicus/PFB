import { Rating } from "react-simple-star-rating";
import { useNavigate } from "react-router-dom";
import useRentRequest from "../hooks/useRentRequest";
import useRating from "../hooks/useRating";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ApiImage from "../components/ApiImage";

import "../styles/RentRequestDetail.css";

export default function RentRequestDetail() {
  const { token } = useAuth();
  const { address, status, owner_username, photos, price, is_available } = useRentRequest();
  const navigate = useNavigate();
  const [rate, setRating] = useState(0);
  const { handleChange, formState, handleSubmit } = useRating();

  formState.rating = rate;
  if (!token) {
    navigate("/login");
  }

  async function handleRating(rate) {
    setRating(rate);
  }

  return (
    <main className="rent-request-detail-main">
      <div className="rent-request-detail">
        {address && <p>Dirección: {address}</p>}
        {status && <p>Estado: {status}</p>}
        {price && <p>Precio: {price}</p>}
        {is_available && <p>is_available: {is_available}</p>}
        <ul>
          {photos?.map((photo) => (
            <li key={photo.id}>
              <ApiImage name={"rent/" + owner_username + "/" + photo.name} alt={photo.name} />
            </li>
          ))}
        </ul>
        {status != "PENDING" && (
          <form onSubmit={handleSubmit}>
            <Rating
              initialValue={1}
              allowFraction={true}
              onClick={handleRating}
              fillColor={"yellow"}
            />
            <br />
            <label htmlFor="comment">Comentario</label>
            <input
              id="comment"
              name="comment"
              required
              value={formState.comment}
              onChange={handleChange}
            />
            <button>Enviar</button>
          </form>
        )}
      </div>
    </main>
  );
}
