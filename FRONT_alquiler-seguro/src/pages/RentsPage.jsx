import { useState } from "react";
import FilterBar from "../components/FilterBar";
import "../index.css";
import ApprovedRentList from "../components/ApprovedRentList";
import LandingHeader from "../components/Landing/LandingHeader";
const RentsPage = () => {
  const [filters, setFilters] = useState({});

  return (
    <div className="p-4">
      <LandingHeader />
      <h1 className="section-title">Alquileres disponibles</h1>
      <FilterBar setFilters={setFilters} />
      <ApprovedRentList filters={filters} />
    </div>
  );
};

export default RentsPage;
