import { useEffect, useState } from "react";
import AdminRentalCard from "./AdminRentCard.jsx";
import { fetchNotApprovedRentals } from "../services/fetchNotApprovedRentals.js";

const NotApprovedRentList = () => {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotApprovedRentals()
      .then((data) => setRents(data))
      .catch(() => setError("Error al cargar los alquileres"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando alquileres...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!rents.length) return <p>No hay alquileres por aprobar.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {rents.map((rent) => (
        <AdminRentalCard
          key={rent.id}
          rental={rent}
          onUpdate={() => {
            setRents((prev) => prev.filter((r) => r.id !== rent.id));
          }}
        />
      ))}
    </div>
  );
};

export default NotApprovedRentList;
