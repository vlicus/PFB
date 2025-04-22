import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Nav() {
  const { token } = useAuth();
  return (
    <nav>
      <menu>
        <li>
          <NavLink to={"/"}>Inicio</NavLink>
        </li>

        {token ? <UserNav /> : <AnonNav />}
      </menu>
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
          <NavLink to="/posts/new">Crear un post</NavLink>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
          {/* <button onClick={()=>setToken("")}>Logout</button> */}
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
