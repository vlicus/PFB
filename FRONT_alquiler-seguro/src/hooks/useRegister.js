import { useState } from "react";
import { registerService } from "../services/userServices";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const navigate = useNavigate();
  let initalState = {
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    phone_number: "",
    bio: "",
  };

  const [formState, setFormState] = useState(initalState);

  const [error, setError] = useState(" ");

  function handleChange({ target: { name, value } }) {
    setError("");
    setFormState({ ...formState, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (formState.password !== formState.passwordRepeat) {
        throw new Error("Las contraseñas no coinciden");
      }

      await registerService(formState);

      console.log("Usuario registrado correctamente");
      setFormState(initalState);
      navigate("/login");
    } catch (e) {
      setError(e.message);
    }
  }

  return { error, handleChange, formState, handleSubmit };
}
