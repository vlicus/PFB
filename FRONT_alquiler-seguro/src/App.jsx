import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./components/Header";
function App() {
  const { token } = useAuth();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
