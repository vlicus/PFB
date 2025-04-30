import { useEffect, useState } from "react";

export default function UserRentalHistory({ userId }) {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/history`)
      .then((res) => res.json())
      .then((data) => {
        const history = data.data?.rental_history || [];
        setRentals(history);
      })
      .catch(() => setRentals([]))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Cargando historial...</p>;

  if (!rentals.length) {
    return <p>Este usuario aún no ha participado en alquileres.</p>;
  }

  return (
    <section className="profile-section">
      <h2 className="section-title">Historial de alquileres</h2>
      <div className="card-list">
        {rentals.map((r, index) => (
          <div key={index} className="card">
            <p>
              <strong>Dirección:</strong> {r.address}
            </p>
            {r.start_date && (
              <p>
                <strong>Inicio:</strong> {r.start_date}
              </p>
            )}
            {r.end_date && (
              <p>
                <strong>Fin:</strong> {r.end_date}
              </p>
            )}
            {!r.start_date && (
              <p>
                <strong>Inicio:</strong> no iniciado
              </p>
            )}
            {!r.end_date && (
              <p>
                <strong>Fin:</strong> en curso
              </p>
            )}
            <p>
              <strong>Rol:</strong> {r.is_owner ? "Casero" : "Inquilino"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
