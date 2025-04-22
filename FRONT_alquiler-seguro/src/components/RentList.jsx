import { useEffect, useState } from "react";
import RentCard from "./RentCard";
import { fetchRentals } from "../services/fetchRentals";

const RentList = () => {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRentals()
      .then((data) => setRents(data))
      .catch(() => setError("Error al cargar los alquileres"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando alquileres...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!rents.length) return <p>No hay alquileres disponibles.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {rents.map((rent) => (
        <RentCard key={rent.id} rental={rent} />
      ))}
    </div>
  );
};

export default RentList;
