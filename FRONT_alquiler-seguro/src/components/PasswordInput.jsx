import { useState } from "react";
import "../styles/Login-Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({ ...attrs }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <div className="input-password-wrapper">
        <input {...attrs} type={passwordVisible ? "text" : "password"} />
        <button
          type="button"
          className="toggle-password-icon"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </>
  );
}
