import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { validationService } from "../services/userServices";
import { useNavigate } from "react-router-dom";

export default function useValidation() {
  const navigate = useNavigate();
  let initalState = {
    regcode: "",
  };
  const [inputState, setinputState] = useState(initalState);
  const [error, setError] = useState("");

  function handleTextChange({ target: { name, value } }) {
    setinputState({ ...inputState, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      if (inputState.regcode.trim().length === 0) {
        throw new Error("El campo no puede estar vacío");
      }

      await validationService(inputState);

      toast("Validación correcta!", {
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
    } catch (error) {
      toast.error(error.message);
    }
  }

  return { inputState, error, handleSubmit, handleTextChange };
}
