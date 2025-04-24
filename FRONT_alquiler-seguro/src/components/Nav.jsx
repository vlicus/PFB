import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Nav() {
  const { token } = useAuth();
  return (
    <nav className="nav-top-right">
      <menu>{token ? <UserNav /> : <AnonNav />}</menu>
    </nav>
  );
}

function UserNav() {
  const { logout } = useAuth();
  return (
    <>
      <>
        <li>
          <NavLink to="/profile">Perfil</NavLink>
        </li>
        <li>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </li>
      </>
    </>
  );
}

function AnonNav() {
  return (
    <>
      <li>
        <NavLink to="/register">Registro</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </>
  );
}
