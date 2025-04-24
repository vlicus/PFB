import { useState } from "react";
import { registerService } from "../services/userServices";
import { useNavigate } from "react-router-dom";

import { Bounce, toast } from "react-toastify";

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

      setFormState(initalState);

      toast("Usuario registrado!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      navigate("/login");
    } catch (e) {
      toast.error(e.message);
      setError(e.message);
    }
  }

  return { error, handleChange, formState, handleSubmit };
}
