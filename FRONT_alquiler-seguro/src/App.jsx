import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import NewRentForm from "./pages/NewRentForm";

import "./index.css";
const App = () => {
  const { token } = useAuth();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
        <Route path="login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/rent/register" element={token ? <NewRentForm /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
