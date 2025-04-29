import Date from "./Date";
import { useRentRequestActions } from "../../hooks/useRentRequestActions";
import { useAuth } from "../../contexts/AuthContext";
import ApiImage from "../ApiImage.jsx";
import { Link } from "react-router-dom";

export default function RentRequest({ rentRequest }) {
  const { id, rent_id, status, address, price, is_available, photo } =
    rentRequest;

  const { myUsername } = useAuth();

  const { changeStatus } = useRentRequestActions();

  return (
    <article>
      <Link to={"/rent/request/" + id}>
        {address && <p>Dirección: {address}</p>}
        {status && <p>Estado: {status}</p>}
        {price && <p>Precio: {price}</p>}
        {is_available && <p>is_available: {is_available}</p>}
        <ApiImage
          name={"rent/" + myUsername + "/" + photo}
          alt={photo}
          height={200}
        />
        {status === "PENDING" && (
          <>
            <li>
              <button
                className="logout-btn"
                onClick={() => changeStatus(rent_id, id, "APPROVED")}
              >
                Aprobar
              </button>
            </li>
            <li>
              <button
                className="logout-btn"
                onClick={() => changeStatus(rent_id, id, "REJECTED")}
              >
                Rechazar
              </button>
            </li>
          </>
        )}
      </Link>
    </article>
  );
}
