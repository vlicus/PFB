import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import UserRentalHistory from "../components/User/UserRentalHistory";
import UserOwnerRatings from "../components/User/UserOwnerRatings";
import UserRenterRatings from "../components/User/UserRenterRatings";
import "../styles/UserPrivateProfile.css";

export default function PublicProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data.data.user))
      .catch(() => setError("Error al cargar el perfil"))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Usuario no encontrado.</p>;

  return (
    <main>
      <div className="profile-card">
        <section className="profile-header">
          <h2>{user.username}</h2>
          <Avatar user={user} />
          {user.bio && <p className="profile-bio">{user.bio}</p>}
          {user.email && <p className="profile-email">Email: {user.email}</p>}
        </section>

        <section className="profile-section">
          <h3 className="section-title">Historial de alquileres</h3>
          <div className="card-list">
            <UserRentalHistory userId={user.id} />
          </div>
        </section>
      </div>
      <UserOwnerRatings userId={user.id} />
      <UserRenterRatings userId={user.id} />
    </main>
  );
}
