import useSendRecoveryEmail from "../hooks/useSendRecoveryEmail";
import "../styles/Login-Register.css";

export default function SendEmailPasswordRecovery() {
  const { handleRecoveryEmailSubmit, handleRecoveryChange, recoveryEmailState } =
    useSendRecoveryEmail();
  return (
    <main>
      <div className="form-card">
        <h2>Introduzca su email</h2>

        <form onSubmit={handleRecoveryEmailSubmit}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            value={recoveryEmailState.email}
            onChange={handleRecoveryChange}
            placeholder="Introduce tu email"
          />
          <button style={{ marginTop: "1rem" }}>Enviar</button>
        </form>
      </div>
    </main>
  );
}
