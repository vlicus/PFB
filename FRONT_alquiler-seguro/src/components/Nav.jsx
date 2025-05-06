import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Buttons.css";
import SplitBasicExample from "../components/SplitBasicExample";
import useUser from "../hooks/useUser";
import Avatar from "./Avatar";

export default function Nav() {
  const { token } = useAuth();
  return (
    <nav className="nav-buttons">
      <menu>{token ? <UserNav /> : <AnonNav />}</menu>
    </nav>
  );
}

function UserNav() {
  const user = useUser();
  return (
    <>
      <ul className="lista">
        <li>
          <Link to="/profile">
            <Avatar user={user} />
          </Link>
        </li>
        <li>
          <div className="nav-buttons">
            <SplitBasicExample></SplitBasicExample>
          </div>
        </li>
      </ul>
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
