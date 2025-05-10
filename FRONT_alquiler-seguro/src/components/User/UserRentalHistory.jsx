import { useEffect, useState } from "react";

export default function UserRentalHistory({ userId }) {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/history`)
      .then((res) => res.json())
      .then((data) => {
        const history = data.data.user?.rental_history || [];
        setRentals(history);
      })
      .catch(() => setRentals([]))
      .finally(() => setLoading(false));
  }, [userId]);

  const statusLabels = {
    PENDING: "Pendiente",
    APPROVED: "Aprobado",
    ACTIVE: "Activo",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
    REJECTED: "Rechazado",
  };

  if (loading) return <p>Cargando historial...</p>;

  if (!rentals.length) {
    return <p>Este usuario aún no ha participado en alquileres.</p>;
  }

  const states = ["ACTIVE", "COMPLETED"];
  const filteredRentals = rentals.filter((rental) =>
    states.includes(rental.status)
  );

  return (
    <section className="profile-section">
      <h2 className="section-title" style={{ marginTop: "0rem" }}>
        Historial de alquileres
      </h2>
      {filteredRentals.length === 0 && (
        <p>Este usuario no tiene historial de alquiler</p>
      )}
      <div className="card-list">
        {filteredRentals.map((r, index) => (
          <div key={index} className="card">
            <p>
              <strong>Dirección:</strong> {r.address}
            </p>

            <p>Estado: {statusLabels[r.status] || r.status}</p>

            {r.start_date && (
              <p>
                <strong>Inicio:</strong>{" "}
                {new Date(r.start_date).toLocaleString("es-ES", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
            )}
            {r.end_date && (
              <p>
                <strong>Fin:</strong>{" "}
                {new Date(r.end_date).toLocaleString("es-ES", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
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
