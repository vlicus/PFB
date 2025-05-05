import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recoveryPasswordService } from "../services/userServices.js";
import { Bounce, toast } from "react-toastify";

export default function usePasswordRecovery() {
  let initialState = {
    email: "",
    recoverPassCode: "",
    newPass: "",
  };

  const navigate = useNavigate();
  const [newPassState, setNewPassState] = useState(initialState);

  async function handleNewPassChange({ target: { name, value } }) {
    setNewPassState({ ...newPassState, [name]: value });
  }

  async function newPassSubmit(e) {
    e.preventDefault();
    try {
      await recoveryPasswordService(newPassState);

      navigate("/login");

      toast.success("Su contraseña ha sido modificada con éxito!", {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    } catch (e) {
      toast.error(e);
    }

    console.log(newPassState, setNewPassState);
  }
  return { newPassSubmit, handleNewPassChange, newPassState };
}
