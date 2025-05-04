import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import useUser from "../hooks/useUser";
import { useAuth } from "../contexts/AuthContext";
const { VITE_API_URL } = import.meta.env;

export default function useUserUpdate() {
  const navigate = useNavigate();
  let initalState = {
    first_name: "",
    last_name: "",
    phone_number: "",
    bio: "",
  };
  const { token, logout } = useAuth();
  const [formState, setFormState] = useState(initalState);
  const [error, setError] = useState(" ");
  function handleChange({ target: { name, value } }) {
    setError("");
    setFormState({ ...formState, [name]: value });
  }
  const userData = useUser();
  useEffect(() => {
    if (userData) {
      setFormState({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        phone_number: userData.phone_number || "",
        bio: userData.bio || "",
      });
    }
  }, [userData]);
  async function handleSubmit(formData) {
    setError("");
    try {
      const res = await fetch(VITE_API_URL + "/users/update", {
        method: "PUT",
        headers: {
          authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (res.status === 401) {
        logout();
      }

      setFormState(initalState);

      toast.success("Usuario actualizado!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
      navigate("/profile");
      setTimeout(() => {
        window.location.reload();
      }, 0);
    } catch (e) {
      toast.error(e.message);
      setError(e.message);
    }
  }

  function handleFileChange({ target }) {
    try {
      setFormState({ ...formState, [target.name]: target.files[0] });
    } catch (error) {
      setError(error);
    }
  }

  return { error, handleChange, formState, handleSubmit, handleFileChange };
}
