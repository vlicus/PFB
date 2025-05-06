const { VITE_API_URL } = import.meta.env;
import { useAuth } from "../contexts/AuthContext";

export function useFetchOwnRentals() {
  const { token } = useAuth();

  const fetchOwnRentals = async () => {
    const res = await fetch(VITE_API_URL + "/rents/own", {
      headers: {
        authorization: token ? "Bearer " + token : "",
      },
    });

    const json = await res.json();
    return json.data.rents;
  };

  return fetchOwnRentals;
}
