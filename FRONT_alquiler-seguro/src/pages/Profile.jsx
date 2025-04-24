import { NavLink, Outlet } from "react-router-dom";
import Avatar from "../Components/Avatar";
import useUser from "../hooks/useUser";
import UserRentalHistory from "../components/User/UserRentalHistory";
import UserRatings from "../components/User/UserRatings";

export default function Profile() {
  const user = useUser();

  return (
    <main>
      {user.is_admin ? <Admin /> : <User />}
      <Outlet />
      <h2>{user.username}</h2>
      <Avatar user={user} />
      {user.email && <p>Email: {user.email}</p>}
      <UserRentalHistory />
      <UserRatings />
    </main>
  );
}

function User() {
  const user = useUser();
  return (
    <>
      <section>
        <h2>{user.username}</h2>
        <Avatar user={user} />
        {user.email && <p>Email: {user.email}</p>}
        {user.phone_number && <p>Número de teléfono: {user.phone_number}</p>}
        {user.first_name && <p>Nombre: {user.first_name}</p>}
        {user.last_name && <p>Apellidos: {user.last_name}</p>}
        {user.bio && <p>Biografía: {user.bio}</p>}
        <ul>
          <li>
            <NavLink to={"/password"} className="password-btn">
              Cambiar Contraseña
            </NavLink>
          </li>
        </ul>
      </section>
      <menu>
        <li>
          <NavLink to={"/profile/rent/new"}>Nueva Propiedad</NavLink>
        </li>
        <li>
          <NavLink to={"/profile/rent/update"}>Editar Propiedad</NavLink>
        </li>
        <li>
          <NavLink to={"/profile/rent/requests/visit"}>
            Solicitudes de visita
          </NavLink>
        </li>
        <li>
          <NavLink to={"/profile/rent/requests/rental"}>
            Solicitudes de alquiler
          </NavLink>
        </li>
      </menu>
    </>
  );
}

function Admin() {
  const user = useUser();
  return (
    <>
      <h2>{user.username}</h2>
      {user.is_admin && <p>Es admin: {user.is_admin}</p>}
      <menu>
        <li>
          <NavLink to={"/profile/rent/approve"}>
            Aprobar nuevos alquileres
          </NavLink>
        </li>
      </menu>
    </>
  );
}
