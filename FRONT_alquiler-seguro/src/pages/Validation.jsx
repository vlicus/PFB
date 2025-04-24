import useValidation from "../hooks/useValidation";

export default function Validation() {
  const { inputState, handleSubmit, handleTextChange } = useValidation();
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="regcode">Código de activación recibido por email: </label>
      <input
        type="text"
        name="regcode"
        id="regcode"
        required
        onChange={handleTextChange}
        value={inputState.regcode}
        minLength={5}
      />
      <button>Enviar!</button>
    </form>
  );
}
