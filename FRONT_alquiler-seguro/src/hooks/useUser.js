import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

export default function useUser() {
  const [user, setUser] = useState({});
  const { token, logout } = useAuth();
  const { userId } = useParams();

  async function loadUser() {
    let ruta = `${VITE_API_URL}/users/${userId ?? ""}`;

    let res = await fetch(ruta, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (res.status === 401) {
      logout();
    }

    let { data } = await res.json();
    setUser(data.user);
  }

  useEffect(() => {
    loadUser();
  }, [userId]);

  return user;
}
