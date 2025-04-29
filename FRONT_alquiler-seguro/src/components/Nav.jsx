import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Buttons.css";

export default function Nav() {
  const { token } = useAuth();
  return (
    <nav className="nav-buttons">
      <menu>{token ? <UserNav /> : <AnonNav />}</menu>
    </nav>
  );
}

function UserNav() {
  const { logout } = useAuth();
  return (
    <>
      <div className="nav-buttons">
        <NavLink to="/profile" className="nav-button">
          Perfil
        </NavLink>
        <button className="nav-button" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}

function AnonNav() {
  return (
    <>
      <div className="nav-buttons">
        <NavLink to="/register" className="nav-button">
          Registro
        </NavLink>
        <NavLink to="/login" className="nav-button">
          Login
        </NavLink>
      </div>
    </>
  );
}
