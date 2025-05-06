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
  const { address, status, owner_username, photos, price, num_rooms, renter_username } =
    useRentRequest();
  const navigate = useNavigate();
  const [rate, setRating] = useState(0);
  const { handleChange, formState, handleSubmit } = useRating();
  const { myUsername } = useAuth();
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
        {price && <p>Precio: {price}</p>}
        {num_rooms && <p>Nº habitaciones: {num_rooms}</p>}
        {myUsername != renter_username && (
          <>{renter_username && <p>Solicitante: {renter_username}</p>}</>
        )}
        {myUsername != owner_username && <> {owner_username && <p>Casero: {owner_username}</p>}</>}
        {status && <p>Estado: {status}</p>}
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
              fillColor={"#01B0F1"}
            />
            <label htmlFor="comment"></label>
            <textarea
              id="comment"
              name="comment"
              required
              placeholder="Aquí puede describir su experiencia"
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
