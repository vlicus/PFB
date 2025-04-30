import { useEffect, useState } from "react";
import Rating from "./UserRatings";

export default function UserRenterRatings({ userId }) {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/ratings`)
      .then((res) => res.json())
      .then((data) => {
        const soloInquilino = data.data.filter((r) => r.is_owner === 0);
        setRatings(soloInquilino);
      })
      .catch(() => setRatings([]))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <section className="profile-section">
      <h2 className="section-title">Valoraciones recibidas de inquilinos</h2>

      {loading && <p>Cargando valoraciones...</p>}

      {!loading && ratings.length === 0 && (
        <p>Este usuario aún no ha recibido valoraciones de inquilinos.</p>
      )}

      {!loading && ratings.length > 0 && (
        <div className="card-list">
          {ratings.map((r) => (
            <div key={r.id} className="card">
              <p>
                <strong>Comentario:</strong> {r.comment || "Sin comentario"}
              </p>
              <div>
                <strong>Valoración:</strong> <Rating rating={r.rating} />
              </div>
              <p>
                <strong>De:</strong> @{r.renter_username}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
