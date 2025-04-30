import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const { VITE_API_URL } = import.meta.env;

export default function useRentRequest() {
  const { logout } = useAuth;
  const [rent, setRent] = useState({});

  let { rentId } = useParams();

  async function loadRent() {
    let res = await fetch(VITE_API_URL + "/rent/" + rentId);

    if (res.status === 401) {
      logout();
      location.reload();
    }

    let { data } = await res.json();
    setRent(data.rent);
  }
  useEffect(() => {
    loadRent();
  }, []);

  return rent;
}
