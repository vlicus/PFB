import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [myUsername, setMyUsername] = useState(
    localStorage.getItem("myUsername") || ""
  );
  const [myId, setMyId] = useState(localStorage.getItem("myId") || "");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("myUsername", myUsername);
    localStorage.setItem("myId", myId);
  }, [token, myUsername, myId]);

  function login(data) {
    setToken(data.token);
    setMyUsername(data.myUsername);
    setMyId(data.myId);
  }

  function logout() {
    setToken("");
    setMyUsername("");
    setMyId("");
    setTimeout(() => navigate("/"), 10);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, myUsername, myId }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
