import { useState } from "react";
import { toast } from "react-toastify";
const { VITE_API_URL } = import.meta.env;

export function useRentRequestActions() {
  const token = localStorage.getItem("token"); // o del contexto si usás uno
  const [error, setError] = useState(" ");
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
      setError(error.message);
      return false;
    }
  };

  return { changeStatus };
}
