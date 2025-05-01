import { useState } from "react";
import { ratingServiceOwner, ratingServiceRenter } from "../services/userServices";
import { Bounce, toast } from "react-toastify";
import useRentRequest from "./useRentRequest";
import { useAuth } from "../contexts/AuthContext";

export default function useRating() {
  const { token } = useAuth();
  const rentRequest = useRentRequest();

  const username = localStorage.getItem("myUsername");

  const { id, owner_username, renter_id, property_owner_id } = rentRequest;
  let initalState = {
    rating: 0,
    comment: "",
  };

  const [formState, setFormState] = useState(initalState);
  const [error, setError] = useState(" ");

  function handleChange({ target: { name, value } }) {
    setError("");
    setFormState({ ...formState, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      if (username !== owner_username) {
        await ratingServiceOwner(formState, property_owner_id, id, token);
      } else {
        await ratingServiceRenter(formState, renter_id, id, token);
      }

      setFormState(initalState);

      toast.success("Reseña realizada correctamente!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    } catch (e) {
      toast.error(e.message);
      setError(e.message);
    }
  }

  return { error, handleChange, formState, handleSubmit };
}
