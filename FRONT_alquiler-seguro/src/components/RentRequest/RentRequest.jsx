import Date from "./Date";
import ApiImage from "../ApiImage";
import { useRentRequestActions } from "../../hooks/useRentRequestActions";

export default function RentRequest({ rentRequest }) {
  const {
    id,
    rent_id,
    renter_id,
    status,
    created_at,
    username,
    email,
    phone_number,
    first_name,
    last_name,
    address,
    price,
    num_rooms,
    is_available,
    photo,
    property_owner_id,
  } = rentRequest;
  const { changeStatus } = useRentRequestActions();
  return (
    <article>
      {id && <p>id: {id}</p>}
      {rent_id && <p>Rent_id: {rent_id}</p>}
      {renter_id && <p>Renter_id: {renter_id}</p>}
      <Date date={created_at} />
      {status && <p>Status: {status}</p>}
      {username && <p>username: {username}</p>}
      {email && <p>email: {email}</p>}
      {phone_number && <p>phone_number: {phone_number}</p>}
      {first_name && <p>first_name: {first_name}</p>}
      {last_name && <p>last_name: {last_name}</p>}
      {address && <p>address: {address}</p>}
      {price && <p>price: {price}</p>}
      {num_rooms && <p>num_rooms: {num_rooms}</p>}
      {is_available && <p>is_available: {is_available}</p>}
      {/*       <ApiImage
        name={"rents/" + property_owner_id + photo}
        alt={photo}
        height={200}
      /> */}
      {/* QUEDA COMENTADO EL APIIMAGE PORQUE NO SE VE LA FOTO */}
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
    </article>
  );
}
