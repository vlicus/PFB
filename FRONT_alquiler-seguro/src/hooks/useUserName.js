import { useEffect, useState } from "react";

export default function useUserName(username) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error al cargar el usuario", err));
  }, [username]);

  return user;
}
