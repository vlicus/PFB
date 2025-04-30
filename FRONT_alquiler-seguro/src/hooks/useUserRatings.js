import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const { VITE_API_URL } = import.meta.env;

export default function useUserRatings() {
  const { logout } = useAuth();
  const [userRatings, setUserRatings] = useState({});
  const { userId } = useParams();

  async function loadUserRatings() {
    let ruta = `${VITE_API_URL}/users/${userId ?? ""}/ratings`;

    let res = await fetch(ruta);

    if (res.status === 401) {
      logout();
    }

    let { data } = await res.json();
    setUserRatings(data.ratings);
  }

  useEffect(() => {
    loadUserRatings();
  }, [userId]);

  return userRatings;
}
