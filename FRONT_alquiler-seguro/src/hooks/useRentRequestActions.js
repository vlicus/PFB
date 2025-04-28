import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
const { VITE_API_URL } = import.meta.env;

export function useRentRequestActions() {
  const { token, logout } = useAuth();

  const changeStatus = async (rentId, requestId, status) => {
    try {
      const res = await fetch(
        VITE_API_URL + "/rent/" + rentId + "/response/" + requestId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: token ? "Bearer " + token : "",
          },
          body: JSON.stringify({ status: status }),
        }
      );

      if (!res.ok) {
        throw new Error("Error al actualizar la solicitud");
      }
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  return { changeStatus };
}
