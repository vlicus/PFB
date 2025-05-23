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
import PublicProfile from "./pages/PublicProfile";

import "./index.css";
import "../src/styles/ToastStyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ApproveRents from "./pages/ApproveRents";
import UpdatePassword from "./pages/UpdatePassword";
import RentsRequested from "./pages/RentsRequested";
import MyRentsRequested from "./pages/MyRentsRequested";
import RentRequestDetail from "./pages/RentRequestDetail";
import FooterComponent from "./pages/Footer";
import RentDetailPage from "./pages/RentDetails";
import UpdateRentForm from "./pages/UpdateRentForm";
import UpdateProfile from "./pages/UpdateProfile";
import RentsPage from "./pages/RentsPage";
import SendEmailPasswordRecovery from "./pages/SendEmailPasswordRecovery";
import SendPasswordRecovery from "./pages/SendPasswordRecovery";
import OwnRents from "./pages/OwnRents";

const App = () => {
  const { token } = useAuth();
  return (
    <>
      <div className="page-container">
        <Header />
        <main className="main-Content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={!token ? <Register /> : <Navigate to="/" />}
            />
            <Route path="/validation/:regcode" element={<Validation />} />
            <Route
              path="login"
              element={!token ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/enterEmailRecovery"
              element={<SendEmailPasswordRecovery />}
            />
            <Route
              path="/passwordRecovery"
              element={<SendPasswordRecovery />}
            />
            <Route
              path="/profile"
              element={token ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="/profile/update" element={<UpdateProfile />} />
            <Route path="/profile/:userId" element={<PublicProfile />} />
            <Route path="/rent/approve" element={<ApproveRents />} />
            <Route path="/rents" element={<RentsPage />} />
            <Route
              path="/rent/new"
              element={token ? <NewRentForm /> : <Navigate to="login" />}
            />
            <Route
              path="/rent/request/:requestId"
              element={<RentRequestDetail />}
            />
            {/*  <Route path="/profile/rent/update" element={<ApproveRents />} /> */}
            <Route path="/rent/requests" element={<RentsRequested />} />
            <Route path="/renter/requests" element={<MyRentsRequested />} />
            <Route path="/password" element={<UpdatePassword />} />
            <Route path="/rent/:rentId" element={<RentDetailPage />} />
            <Route path="/rent/:rentId/update" element={<UpdateRentForm />} />
            <Route path="/rents/own" element={<OwnRents />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FooterComponent />
        </main>{" "}
      </div>
    </>
  );
};

export default App;
