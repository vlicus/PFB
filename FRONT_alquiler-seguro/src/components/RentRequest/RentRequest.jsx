import Date from "./Date";
import { useRentRequestActions } from "../../hooks/useRentRequestActions";
import { useAuth } from "../../contexts/AuthContext";
import ApiImage from "../ApiImage.jsx";
import { Link } from "react-router-dom";
import "../../styles/RentRequest.css";
import "../../styles/Buttons.css";

export default function RentRequest({ rentRequest }) {
  const {
    id,
    rent_id,
    status,
    address,
    price,
    is_available,
    photo,
    owner_username,
    renter_username,
  } = rentRequest;

  const { myUsername } = useAuth();

  const { changeStatus } = useRentRequestActions();

  return (
    <article className="rent-request-list">
      <Link to={"/rent/request/" + id}>
        <ApiImage
          name={"rent/" + owner_username + "/" + photo}
          alt={photo}
          height={200}
        />
        {address && <p>Dirección: {address}</p>}
        {status && <p>Estado: {status}</p>}
        {price && <p>Precio: {price}</p>}
        {is_available && <p>is_available: {is_available}</p>}
        {renter_username && <p>Solicitante: {renter_username}</p>}
        {owner_username && <p>Casero: {owner_username}</p>}
      </Link>
      {status === "PENDING" && myUsername === owner_username && (
        <>
          <div className="rental-card-buttons">
            <button
              className="book-visit-btn"
              onClick={() => changeStatus(rent_id, id, "APPROVED")}
            >
              Aprobar
            </button>
            <button
              className="book-visit-btn"
              onClick={() => changeStatus(rent_id, id, "REJECTED")}
            >
              Rechazar
            </button>
          </div>
        </>
      )}
    </article>
  );
}
