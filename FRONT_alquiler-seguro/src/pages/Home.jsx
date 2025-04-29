import ApprovedRentList from "../components/ApprovedRentList";
import LandingHeader from "../components/Landing/LandingHeader";
import UserTypeGrid from "../components/Landing/UserTypeGrid";
import RentPageDiv from "../components/RentPageDiv";
import CaserosRedirect from "../components/CaserosRedirect";
const Home = () => {
  return (
    <div className="p-6">
      <LandingHeader />
      <UserTypeGrid />
      <h1 className="text-2xl font-bold mb-4">Alquileres disponibles</h1>
      <ApprovedRentList />
      <RentPageDiv />
      <CaserosRedirect />
    </div>
  );
};

export default Home;
