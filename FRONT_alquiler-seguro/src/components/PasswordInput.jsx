import { useState } from "react";

export default function PasswordInput({ ...attrs }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <input {...attrs} type={passwordVisible ? "text" : "password"} />
      <button type="button" onClick={togglePasswordVisibility}>
        {passwordVisible ? "ocultar" : "ver"}
      </button>
    </>
  );
}
