import { useEffect, useState } from "react";
import Rating from "./UserRatings";
import { Link } from "react-router-dom";

export default function UserOwnerRatings({ userId }) {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/ratings`)
      .then((res) => res.json())
      .then((data) => {
        const soloCasero = data.data.filter((r) => r.is_owner === 1);
        setRatings(soloCasero);
      })
      .catch(() => setRatings([]))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <section className="profile-section">
      <h2 className="section-title">Valoraciones recibidas de caseros</h2>

      {loading && <p>Cargando valoraciones...</p>}

      {!loading && ratings.length === 0 && (
        <p>Este usuario aún no ha recibido valoraciones de caseros.</p>
      )}

      {!loading && ratings.length > 0 && (
        <div className="card-list">
          {ratings.map((r) => (
            <div key={r.id} className="card">
              <p>{r.comment || "Sin comentario"}</p>
              <p>
                <Rating rating={r.rating} />
              </p>
              <p>
                <Link to={`/profile/${r.renter_id}`}>@{r.renter_username}</Link>
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
