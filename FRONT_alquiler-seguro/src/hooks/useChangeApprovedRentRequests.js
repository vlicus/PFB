import { Bounce, toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
const { VITE_API_URL } = import.meta.env;

export function useRentApprovaltActions() {
  const { token } = useAuth();

  const changeApproval = async (rentId, approval) => {
    try {
      const res = await fetch(VITE_API_URL + "/rent/" + rentId + "/approve/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token ? "Bearer " + token : "",
        },
        body: JSON.stringify({ is_approved: approval }),
      });

      if (!res.ok) {
        throw new Error("Error al actualizar la solicitud");
      }
      toast.success("Alquiler aprobado!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  return { changeApproval };
}
