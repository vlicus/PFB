import { useEffect } from "react";
import { Bounce, toast } from "react-toastify";
import { validationService } from "../services/userServices";
import { useNavigate, useParams } from "react-router-dom";

export default function useValidation() {
  const navigate = useNavigate();
  const { regcode } = useParams();

  /* 
  const [error, setError] = useState(""); */

  // Solo se ejecuta una vez, por eso le pasamos el array de dependencias vacío
  useEffect(() => {
    validate();
  }, []);

  async function validate() {
    /* setError(""); */
    try {
      await validationService(regcode);

      toast.success("Validación correcta!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  }
}
