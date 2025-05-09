import { Children, useEffect, useState } from "react";
import RentCard from "./RentCard";
import { fetchApprovedRentals } from "../services/fetchApprovedRentals.js";
import "../styles/ApprovedRentList.css";

const ApprovedRentList = ({ filters }) => {
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const itemsPerPage = 3;
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerPage);
  };

  useEffect(() => {
    setLoading(true);
    fetchApprovedRentals(filters)
      .then((data) => {
        setRents(data);
      })
      .catch(() => setError("Error al cargar los alquileres"))
      .finally(() => setLoading(false));
  }, [filters]);

  if (loading) return <p>Cargando alquileres...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!Array.isArray(rents) || rents.length === 0)
    return <p className="no-disp">No hay alquileres disponibles.</p>;

  return (
    <>
      <div className="approved-rent-list">
        {rents.slice(0, visibleCount).map((rent) => (
          <RentCard key={rent.id} rental={rent} />
        ))}
      </div>

      <div className="load-more-container">
        {visibleCount < rents.length ? (
          <button className="load-more-btn" onClick={handleLoadMore}>
            Cargar más
          </button>
        ) : (
          <p className="no-more-text">No hay más alquileres por mostrar.</p>
        )}
      </div>
    </>
  );
};

export default ApprovedRentList;
