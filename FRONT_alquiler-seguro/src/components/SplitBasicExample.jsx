import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "../contexts/AuthContext";
import useUser from "../hooks/useUser";

function SplitBasicExample() {
  const user = useUser();

  return (
    <main className="profile-container">
      {user.is_admin ? <Admin /> : <User />}
    </main>
  );
}

function User() {
  const { logout } = useAuth();
  return (
    <Dropdown data-bs-theme="dark">
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
        Administración
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/profile">Perfil</Dropdown.Item>
        <Dropdown.Item href="/profile/update">Editar usuario</Dropdown.Item>
        <Dropdown.Item href="/password">Cambiar contraseña</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="/rent/new">Nueva Propiedad</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="/rent/requests">
          Solicitudes de visita/alquiler
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="/renter/requests">
          Mis solicitudes de visita/alquiler
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function Admin() {
  const { logout } = useAuth();
  return (
    <Dropdown data-bs-theme="dark">
      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
        Administración
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/rent/approve">Lista de alquileres</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SplitBasicExample;
