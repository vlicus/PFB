import { useEffect, useState } from "react";
import "../styles/FilterBar.css";

export default function FilterBar({ setFilters }) {
  const [tempFilters, setTempFilters] = useState({
    minRooms: "",
    maxPrice: "",
    city: "",
  });

  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/cities`)
      .then((res) => res.json())
      .then((data) => setCities(data.data))
      .catch((err) => console.error("Error cargando ciudades:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "minRooms" || name === "maxPrice") && value < 0) {
      newValue = 0;
    }
    setTempFilters({ ...tempFilters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters(tempFilters);
    setTempFilters({ minRooms: "", maxPrice: "", city: "" });
  };

  return (
    <form className="filter-bar" onSubmit={handleSubmit}>
      <select
        name="city"
        value={tempFilters.city}
        onChange={handleChange}
        className="filter-input"
      >
        <option value="">Todas las ciudades</option>
        {cities.map((city, idx) => (
          <option key={idx} value={city}>
            {city}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="minRooms"
        placeholder="Habitaciones mín."
        value={tempFilters.minRooms}
        onChange={handleChange}
        className="filter-input"
        min="0"
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Precio máx."
        value={tempFilters.maxPrice}
        onChange={handleChange}
        className="filter-input"
        step="100"
        min="0"
      />

      <button type="submit" className="filter-button">
        Buscar
      </button>
    </form>
  );
}
