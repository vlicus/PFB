import ApprovedRentList from "../components/ApprovedRentList";
import LandingHeader from "../components/Landing/LandingHeader";
import UserTypeGrid from "../components/Landing/UserTypeGrid";
import RentPageDiv from "../components/RentPageDiv";
import CaserosRedirect from "../components/CaserosRedirect";
import "../index.css";
import { useAuth } from "../contexts/AuthContext";
const Home = () => {
  const { token } = useAuth();
  return (
    <div className="p-6">
      <LandingHeader />
      {!token && <UserTypeGrid />};
      <h1 className="section-title">Alquileres disponibles</h1>
      <ApprovedRentList />
      <RentPageDiv />
      <CaserosRedirect />
    </div>
  );
};

export default Home;
