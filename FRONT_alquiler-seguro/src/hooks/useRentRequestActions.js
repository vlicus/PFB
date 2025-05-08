import { Bounce, toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
const { VITE_API_URL } = import.meta.env;
import { useNavigate } from "react-router-dom";

export function useRentRequestActions() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const statusLabels = {
    PENDING: "Pendiente",
    APPROVED: "Aprobado",
    ACTIVE: "Activo",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
    REJECTED: "Rechazado",
  };

  const sendRentRequest = async (rentId) => {
    try {
      const res = await fetch(VITE_API_URL + "/rent/" + rentId + "/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token ? "Bearer " + token : "",
        },
      });

      if (!token) {
        throw new Error("Necesitas estar logueado para solicitar una visita");
      }

      if (!res.ok) {
        throw new Error("Error al crear la solicitud");
      }
      toast.success("Visita solicitada!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });

      /* setTimeout(() => {
        window.location.reload();
      }, 1000); */
      return true;
    } catch (error) {
      toast.error(error.message);
      navigate("/login");
      return false;
    }
  };

  const changeStatus = async (rentId, requestId, status) => {
    try {
      const res = await fetch(VITE_API_URL + "/rent/" + rentId + "/response/" + requestId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token ? "Bearer " + token : "",
        },
        body: JSON.stringify({ status: status }),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar la solicitud");
      }
      const displayedStatus = statusLabels[status] || status;
      toast.success("Alquiler " + displayedStatus + "!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  return { changeStatus, sendRentRequest };
}
