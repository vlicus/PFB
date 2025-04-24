import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const { VITE_API_URL } = import.meta.env;

export default function useAllRentRequests() {
  const [requests, setRequest] = useState([]);
  const { token, logout } = useAuth();

  async function loadRequests() {
    let res = await fetch(VITE_API_URL + "/rents/requests", {
      headers: {
        authorization: token ? "Bearer " + token : "",
      },
    });

    if (res.status === 401) {
      logout();
      location.reload();
    }

    let { data } = await res.json();
    setRequest(data.rentRequests);
  }

  useEffect(() => {
    loadRequests();
  }, []);

  return requests;
}
