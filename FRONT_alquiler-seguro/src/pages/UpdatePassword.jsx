import { ToastContainer } from "react-toastify";
import PasswordInput from "../Components/PasswordInput";
import usePasswordChange from "../hooks/usePasswordChange";

export default function UpdatePassword() {
  const { error, handleChange, formState, handleSubmit } = usePasswordChange();

  return (
    <main>
      <h2>Cambiar contraseña</h2>
      <form action={handleSubmit}>
        {error && <p style={{ color: "darkred" }}>{error}</p>}
        <ul>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </li>
          <li>
            <label htmlFor="password">Contraseña:</label>
            <PasswordInput
              required
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </li>
          <li>
            <label htmlFor="newPassword">Nueva contraseña:</label>
            <PasswordInput
              type="password"
              required
              id="newPassword"
              name="newPassword"
              value={formState.newPassword}
              onChange={handleChange}
            />
          </li>
        </ul>
        <button>Enviar</button>
      </form>
      <ToastContainer position="bottom-right" />
    </main>
  );
}
