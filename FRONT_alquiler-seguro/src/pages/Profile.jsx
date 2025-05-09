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
      <div id="profile" className="profile-card">
        <section className="profile-header">
          <h2>{user.username}</h2>
          <Avatar user={user} />
        </section>

        <section id="profile" className="profile-details">
          {user.first_name && <p>{user.first_name}</p>}
          {user.last_name && <p>{user.last_name}</p>}
          {user.email && <p>{user.email}</p>}
          {user.phone_number && <p>{user.phone_number}</p>}

          {user.bio && <p>{user.bio}</p>}
        </section>
      </div>
      <div className="profile-actions">
        <NavLink to="/password" className="nav-button">
          Cambiar Contraseña
        </NavLink>
        <NavLink to="/profile/update" className="nav-button">
          Editar usuario
        </NavLink>
      </div>

      <div className="rating-container">
        <UserOwnerRatings userId={user.id} />
        <UserRenterRatings userId={user.id} />
      </div>
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
