import { loginService } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

import { Bounce, toast } from "react-toastify";

export default function useLogin() {
  const { login } = useAuth();

  const navigate = useNavigate();
  let initalState = {
    email: "",
    password: "",
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
      const { data } = await loginService(formState);

      login(data.token);

      /* setFormState(initalState); */
      toast("Usuario logeado correctamente!", {
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

      navigate("/");
    } catch (e) {
      toast.error(e.message);
      setError(e.message);
    }
  }

  return { error, formState, handleSubmit, handleChange };
}
