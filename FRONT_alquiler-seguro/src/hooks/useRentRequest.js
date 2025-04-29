import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function useRentRequest() {
  const [request, setRequest] = useState({});
  const { token, logout } = useAuth();

  let { requestId } = useParams();

  async function loadRequests() {
    let res = await fetch(VITE_API_URL + "/rent/request/" + requestId, {
      headers: {
        authorization: token ? "Bearer " + token : "",
      },
    });

    if (res.status === 401) {
      logout();
      location.reload();
    }

    let { data } = await res.json();
    setRequest(data.request);
  }
  useEffect(() => {
    loadRequests();
  }, []);

  return request;
}
