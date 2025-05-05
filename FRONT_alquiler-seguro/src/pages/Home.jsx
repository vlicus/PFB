import ApprovedRentList from "../components/ApprovedRentList";
import LandingHeader from "../components/Landing/LandingHeader";
import UserTypeGrid from "../components/Landing/UserTypeGrid";
import RentPageDiv from "../components/RentPageDiv";
import CaserosRedirect from "../components/CaserosRedirect";
import FilterBar from "../components/FilterBar";
import "../index.css";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
const Home = () => {
  const { token } = useAuth();
  const [filters, setFilters] = useState({});
  return (
    <div className="p-6">
      <LandingHeader />
      {!token && <UserTypeGrid />}
      <h1 className="section-title">Alquileres disponibles</h1>
      <FilterBar setFilters={setFilters} />
      <ApprovedRentList filters={filters} />
      <RentPageDiv />
      <CaserosRedirect />
    </div>
  );
};

export default Home;
