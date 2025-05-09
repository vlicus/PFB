import { useEffect, useState } from "react";
import Review from "./ReviewCard";
import "../../styles/UserProfile.css";

export default function UserOwnerRatings({ userId }) {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

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
      <h2 className="section-title">Valoraciones recibidas de los caseros</h2>

      {loading && <p>Cargando valoraciones...</p>}

      {!loading && ratings.length === 0 && (
        <p>Este usuario aún no ha recibido valoraciones de los caseros.</p>
      )}

      {!loading && ratings.length > 0 && <Review ratings={ratings} />}
    </section>
  );
}
