import useSendRecoveryEmail from "../hooks/useSendRecoveryEmail";

export default function SendEmailPasswordRecovery() {
  const { handleRecoveryEmailSubmit, handleRecoveryChange, recoveryEmailState } =
    useSendRecoveryEmail();
  return (
    <main>
      <h2>Introduzca el email para recuperar su contraseña</h2>

      <form onSubmit={handleRecoveryEmailSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          id="email"
          value={recoveryEmailState.email}
          onChange={handleRecoveryChange}
          placeholder="Introduce tu email"
        />
        <button>Enviar</button>
      </form>
    </main>
  );
}
