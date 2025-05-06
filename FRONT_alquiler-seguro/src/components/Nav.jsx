import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Buttons.css";
import SplitBasicExample from "../components/SplitBasicExample";
import useUser from "../hooks/useUser";
import Avatar from "./Avatar";

export default function Nav() {
  const { token } = useAuth();
  const user = useUser();
  return (
    <nav className="nav-buttons">
      <ul className="lista">
        <li>
          <Link to="/profile">
            <Avatar user={user} />
          </Link>
        </li>
        <li>
          <menu>{token ? <UserNav /> : <AnonNav />}</menu>
        </li>
      </ul>
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
