import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Buttons.css";
import SplitBasicExample from "../components/SplitBasicExample";

export default function Nav() {
  const { token } = useAuth();
  return (
    <nav className="nav-buttons">
      <menu>{token ? <UserNav /> : <AnonNav />}</menu>
    </nav>
  );
}

function UserNav() {
  return (
    <>
      <div className="nav-buttons">
        <SplitBasicExample></SplitBasicExample>
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
