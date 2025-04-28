import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import NewRentForm from "./pages/NewRentForm";
import Validation from "./pages/Validation";

import "./index.css";
import ApproveRents from "./pages/ApproveRents";
import UpdatePassword from "./pages/UpdatePassword";
const App = () => {
  const { token } = useAuth();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/validation/:regcode" element={<Validation />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
        <Route path="login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />}>
          <Route path="/profile/rent/approve" element={<ApproveRents />} />
          <Route path="/profile/rent/new" element={<ApproveRents />} />
          <Route path="/profile/rent/update" element={<ApproveRents />} />
          <Route path="/profile/rent/requests/visit" element={<ApproveRents />} />
          <Route path="/profile/rent/requests/rental" element={<ApproveRents />} />
        </Route>
        <Route path="/password" element={<UpdatePassword />} />
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
