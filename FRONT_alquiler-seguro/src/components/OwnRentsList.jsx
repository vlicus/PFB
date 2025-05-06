import { useEffect, useState } from "react";
import OwnRentCard from "./OwnRentCard.jsx";
import { useFetchOwnRentals } from "../hooks/useOwnRentals.js";
import "../styles/RentRequest.css";

const OwnRentList = () => {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOwnRentals = useFetchOwnRentals();

  useEffect(() => {
    fetchOwnRentals()
      .then((data) => setRents(data))
      .catch(() => setError("Error al cargar los alquileres"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando alquileres...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!rents.length) return <p>No tienes alquileres aprobados por el admin.</p>;

  return (
    <main className="">
      <h2>Lista de mis propiedades</h2>
      <div className="rent-request-list-li">
        <ul>
          {rents.map((rent) => (
            <li className="rent-request-list-li" key={rent.id}>
              <OwnRentCard
                rental={rent}
                onUpdate={() => {
                  setRents((prev) => prev.filter((r) => r.id !== rent.id));
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default OwnRentList;
