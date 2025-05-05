import PasswordInput from "../Components/PasswordInput";
import useLogin from "../hooks/useLogin";
import "../styles/Login-Register.css";

export default function Login() {
  const { formState, handleSubmit, handleChange } = useLogin();

  return (
    <main>
      <div className="form-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
              <label htmlFor="password">Contraseña</label>
              <PasswordInput
                required
                id="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
            </li>
          </ul>
          <button>Enviar</button>
        </form>
      </div>
    </main>
  );
}
