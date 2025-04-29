import { useNavigate } from "react-router-dom";
import useRentRequest from "../hooks/useRentRequest";
import { useAuth } from "../contexts/AuthContext";
import ApiImage from "../components/ApiImage";

const { VITE_API_URL } = import.meta.env;

export default function RentRequestDetail() {
  const { token, setToken } = useAuth();

  const navigate = useNavigate();

  const rentRequest = useRentRequest();

  const { id, rent_id, status, address, price, is_available, photo } =
    rentRequest;

  async function sendVote(value) {
    if (!token) {
      navigate("/login");
    }

    //mandar al back
    console.log(`Dándole al usuario ${id} una puntuación de ${value}`);

    const res = await fetch(VITE_API_URL + "/entries/" + id + "/votes", {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value,
      }),
    });
  }
  return (
    <main>
      {address && <p>Dirección: {address}</p>}
      {status && <p>Estado: {status}</p>}
      {price && <p>Precio: {price}</p>}
      {is_available && <p>is_available: {is_available}</p>}
    </main>
  );
}
