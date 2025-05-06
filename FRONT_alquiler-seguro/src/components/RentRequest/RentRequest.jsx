import Date from "./Date";
import { useRentRequestActions } from "../../hooks/useRentRequestActions";
import { useAuth } from "../../contexts/AuthContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    photo,
    owner_username,
    renter_username,
  } = rentRequest;

  const statusLabels = {
    PENDING: "Pendiente",
    APPROVED: "Aprobado",
    ACTIVE: "Activo",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
    REJECTED: "Rechazado",
  };

  const { myUsername } = useAuth();

  const { changeStatus } = useRentRequestActions();

  return (
    <article className="rent-request-list">
      <Link to={"/rent/request/" + id}>
        <div>
          <ApiImage
            name={`rent/${owner_username}/${photo}`}
            alt="Imagen de la solicitud"
            className="single-request-image"
          />
        </div>

        {address && <p className="rent-card-city">Dirección: {address}</p>}
        {myUsername != renter_username && (
          <>
            {renter_username && (
              <p className="rental-owner">Solicitante: {renter_username}</p>
            )}
          </>
        )}
        {myUsername != owner_username && (
          <>
            {owner_username && (
              <p className="rental-owner">Casero: {owner_username}</p>
            )}
          </>
        )}
        <p>Estado: {statusLabels[status] || status}</p>
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
      {status === "APPROVED" && myUsername === owner_username && (
        <>
          <div className="rental-card-buttons">
            <button
              className="book-visit-btn"
              onClick={() => changeStatus(rent_id, id, "ACTIVE")}
            >
              Dar llaves
            </button>
            <button
              className="book-visit-btn"
              onClick={() => changeStatus(rent_id, id, "CANCELLED")}
            >
              Cancelar
            </button>
          </div>
        </>
      )}
      {status === "ACTIVE" && myUsername === owner_username && (
        <>
          <div className="rental-card-buttons">
            <button
              className="book-visit-btn"
              onClick={() => changeStatus(rent_id, id, "COMPLETED")}
            >
              Completar
            </button>
            <button
              className="book-visit-btn"
              onClick={() => changeStatus(rent_id, id, "CANCELLED")}
            >
              Cancelar
            </button>
          </div>
        </>
      )}
    </article>
  );
}
