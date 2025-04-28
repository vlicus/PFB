import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [myUsername, setUsername] = useState(
    localStorage.getItem("myUsername") || ""
  );

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("myUsername", myUsername);
  }, [token, myUsername]);

  function login(data) {
    setToken(data.token);
    setUsername(data.myUsername);
  }

  function logout() {
    setToken("");
    setUsername("");
    setTimeout(() => navigate("/"), 10);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, myUsername }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
