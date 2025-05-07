import PasswordInput from "../Components/PasswordInput";
import usePasswordRecovery from "../hooks/usePasswordRecovery";
import "../styles/Login-Register.css";

export default function SendEmailPasswordRecovery() {
  const { newPassState, newPassSubmit, handleNewPassChange } = usePasswordRecovery();

  return (
    <main>
      <div className="form-card">
        <h2>Introduzca los datos</h2>
        <form onSubmit={newPassSubmit}>
          <ul>
            <li>
              <label htmlFor="email">Email</label>
              <input
                style={{ width: "100%" }}
                name="email"
                id="email"
                value={newPassState.email}
                onChange={handleNewPassChange}
                placeholder="Introduce tu email"
              />
            </li>
            <li>
              <label htmlFor="recoverPassCode">Código de recuperación</label>
              <input
                style={{ width: "100%" }}
                name="recoverPassCode"
                id="recoverPassCode"
                value={newPassSubmit.recoverPassCode}
                onChange={handleNewPassChange}
                placeholder="Introduce el código de recuperación"
              />
            </li>
            <li>
              <label htmlFor="newPass">Contraseña nueva</label>
              <PasswordInput
                name="newPass"
                id="newPass"
                type="password"
                value={newPassSubmit.newPass}
                onChange={handleNewPassChange}
                placeholder="Introduce tu nueva contraseña"
              />
            </li>
          </ul>
          <button>Actualizar</button>
        </form>
      </div>
    </main>
  );
}
