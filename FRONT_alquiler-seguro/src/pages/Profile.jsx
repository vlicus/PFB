import { NavLink } from "react-router-dom";
import Avatar from "../components/Avatar";
import useUser from "../hooks/useUser";
import "../styles/UserPrivateProfile.css";
import "../styles/Buttons.css";

import UserOwnerRatings from "../components/User/UserOwnerRatings";
import UserRenterRatings from "../components/User/UserRenterRatings";

export default function Profile() {
  const user = useUser();

  return (
    <main className="profile-container">
      {user.is_admin ? <Admin /> : <User />}
    </main>
  );
}

function User() {
  const user = useUser();
  return (
    <>
      <section className="profile-header">
        <h2>{user.username}</h2>
        <Avatar user={user} />
      </section>

      <section className="profile-info">
        {user.email && <p>Email: {user.email}</p>}
        {user.phone_number && <p>Número de teléfono: {user.phone_number}</p>}
        {user.first_name && <p>Nombre: {user.first_name}</p>}
        {user.last_name && <p>Apellidos: {user.last_name}</p>}
        {user.bio && <p>Biografía: {user.bio}</p>}
      </section>

      {/* 🔁 Botones de acción en fila */}
      <div className="profile-actions">
        <NavLink to="/password" className="nav-button">
          Cambiar Contraseña
        </NavLink>
        <NavLink to="/profile/update" className="nav-button">
          Editar usuario
        </NavLink>
        <NavLink to="/profile/rent/new" className="nav-button">
          Nueva Propiedad
        </NavLink>

        <NavLink to="/profile/rent/requests" className="nav-button">
          Solicitudes de visita/alquiler
        </NavLink>

        <NavLink to="/profile/renter/requests" className="nav-button">
          Mis solicitudes de visita/alquiler
        </NavLink>
      </div>
      <UserOwnerRatings userId={user.id} />
      <UserRenterRatings userId={user.id} />
    </>
  );
}

function Admin() {
  const user = useUser();
  return (
    <>
      <section className="profile-header">
        <h2>{user.username}</h2>
      </section>

      <menu className="nav-links">
        <li>
          <NavLink to={"/profile/rent/approve"} className="nav-button">
            Aprobar nuevos alquileres
          </NavLink>
        </li>
      </menu>
    </>
  );
}
