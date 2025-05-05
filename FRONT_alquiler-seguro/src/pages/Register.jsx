import PasswordInput from "../Components/PasswordInput";
import useRegister from "../hooks/useRegister";
import "../styles/Login-Register.css";

export default function Register() {
  const { handleChange, formState, handleSubmit } = useRegister();

  return (
    <main>
      <div className="form-card">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="username">Nombre de usuario:</label>
              <input
                type="text"
                id="username"
                required
                value={formState.username}
                name="username"
                onChange={handleChange}
              />
            </li>
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
                className="input-password-container"
              />
            </li>
            <li>
              <label htmlFor="passwordRepeat">Repetir contraseña</label>
              <PasswordInput
                type="password"
                required
                id="passwordRepeat"
                name="passwordRepeat"
                value={formState.passwordRepeat}
                onChange={handleChange}
                className="input-password-container"
              />
            </li>
            <li>
              <label htmlFor="phone_number">Número de teléfono</label>
              <input
                type="text"
                required
                id="phone_number"
                name="phone_number"
                value={formState.phone_number}
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                required
                id="bio"
                name="bio"
                value={formState.bio}
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
