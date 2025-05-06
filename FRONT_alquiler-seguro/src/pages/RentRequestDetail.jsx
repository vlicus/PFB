import { Rating } from "react-simple-star-rating";
import { Link, useNavigate } from "react-router-dom";
import useRentRequest from "../hooks/useRentRequest";
import useRating from "../hooks/useRating";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ApiImage from "../components/ApiImage";

import "../styles/RentRequestDetail.css";

export default function RentRequestDetail() {
  const { token } = useAuth();
  const {
    address,
    status,
    owner_username,
    property_owner_id,
    photos,
    price,
    num_rooms,
    renter_username,
    renter_id,
  } = useRentRequest();
  const navigate = useNavigate();
  const [rate, setRating] = useState(0);
  const { handleChange, formState, handleSubmit } = useRating();
  const { myUsername } = useAuth();

  const statusLabels = {
    PENDING: "Pendiente",
    APPROVED: "Aprobado",
    ACTIVE: "Activo",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
    REJECTED: "Rechazado",
  };
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
          <Link to={"/profile/" + renter_id}>
            <>{renter_username && <p>Solicitante: {renter_username}</p>}</>
          </Link>
        )}
        {myUsername != owner_username && (
          <Link to={"/profile/" + property_owner_id}>
            <> {owner_username && <p>Casero: {owner_username}</p>}</>
          </Link>
        )}
        <p>Estado: {statusLabels[status] || status}</p>
        <ul>
          {photos?.map((photo) => (
            <li key={photo.id}>
              <ApiImage
                name={"rent/" + owner_username + "/" + photo.name}
                alt={photo.name}
              />
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
