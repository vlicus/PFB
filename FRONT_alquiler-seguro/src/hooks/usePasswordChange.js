import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
const { VITE_API_URL } = import.meta.env;

export default function useRegister() {
  const navigate = useNavigate();
  const initalState = {
    email: "",
    password: "",
    newPassword: "",
  };

  const { token, logout } = useAuth();

  const [error, setError] = useState("");

  const [formState, setFormState] = useState(initalState);

  async function handleSubmit(formData) {
    setError("");

    try {
      if (!formState.email.trim()) {
        throw new Error("El email es obligatorio");
      }
      if (!formState.password.trim()) {
        throw new Error("La contraseña es obligatoria");
      }
      if (!formState.newPassword.trim()) {
        throw new Error("La nueva contraseña es obligatoria");
      }

      const res = await fetch(VITE_API_URL + "/users/password/change", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (res.status === 401) {
        logout();
      }

      let json = await res.json();
      if (json.status === "error") {
        throw new Error(json.message);
      }

      toast("Contraseña actualizada", {
        autoClose: 2000,
      });

      console.log("Contraseña actualizada");
      setFormState(initalState);
      logout();
    } catch (e) {
      toast.error(e.message);
      setError(e.message);
    }
  }
  function handleChange({ target }) {
    setFormState({ ...formState, [target.name]: target.value });
  }

  return { error, handleChange, formState, handleSubmit };
}
