import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import { emailRecoveryPasswordService } from "../services/userServices";
import { useNavigate } from "react-router-dom";

export default function useSendRecoveryEmail() {
  let initialState = {
    email: "",
  };
  const [recoveryEmailState, setRecoveryEmailState] = useState(initialState);
  const navigate = useNavigate();

  // Para navegar desde el login hasta la ruta para poder enviar el email
  async function handleRecoverySubmit(e) {
    e.preventDefault();
    navigate("/enterEmailRecovery");
  }

  async function handleRecoveryChange({ target: { name, value } }) {
    setRecoveryEmailState({ ...recoveryEmailState, [name]: value });
  }
  async function handleRecoveryEmailSubmit(e) {
    e.preventDefault();

    try {
      await emailRecoveryPasswordService(recoveryEmailState);
      toast.success(
        "Se le ha enviado un correo electrónico, por favor revise su bandeja de entrada",
        {
          position: "bottom-right",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        }
      );
    } catch (e) {
      toast.error(e);
    }
  }
  return {
    handleRecoveryEmailSubmit,
    handleRecoveryChange,
    recoveryEmailState,
    handleRecoverySubmit,
  };
}
