import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function useNewRent() {
  const initialState = {
    address: "",
    city: "",
    price: "",
    num_rooms: "",
    description: "",
  };

  const navigate = useNavigate();

  const { token, logout } = useAuth();

  const [error, setError] = useState("");

  const [formState, setFormState] = useState(initialState);

  async function handleSubmit(formData) {
    setError("");

    try {
      if (formState.address.trim().length < 5) {
        throw new Error("La dirección debe tener al menos 5 caracteres");
      }
      if (formState.city.trim().length < 3) {
        throw new Error("La ciudad debe tener al menos 3 caracteres");
      }
      if (!formState.city.trim()) {
        throw new Error("La ciudad es obligatoria");
      }
      if (!formState.address.trim()) {
        throw new Error("La dirección es obligatoria");
      }

      if (!formState.description.trim()) {
        throw new Error("La descripción de la vivienda es obligatoria");
      }

      if (!formState.price.trim()) {
        throw new Error("El alquiler de la vivienda es obligatorio");
      }

      if (!formState.num_rooms.trim()) {
        throw new Error("El número de habitaciones de la vivienda es obligatorio");
      }

      const res = await fetch(VITE_API_URL + "/rent/register", {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (res.status === 401) {
        logout();
      }

      let json = await res.json();
      if (json.status === "error") {
        throw new Error(json.message);
      }

      toast.success("Alquiler creado, espere a que el administrador valide los datos!", {
        position: "bottom-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });

      navigate("/profile");
      setFormState(initialState);
    } catch (e) {
      toast.error(e.message);
      setError(e.message);
    }
  }

  function handleTextChange({ target }) {
    setFormState({ ...formState, [target.name]: target.value });
  }

  function handleFileChange({ target }) {
    try {
      setFormState({ ...formState, [target.name]: target.files[0] });
      toast.success("Fotos añadidas correctamente!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    } catch (error) {
      if (target.files.length > 20) {
        toast.error("No se pueden añadir más de 20 fotos");
        setError(error);
      }
    }
  }

  return { formState, error, handleSubmit, handleTextChange, handleFileChange };
}
