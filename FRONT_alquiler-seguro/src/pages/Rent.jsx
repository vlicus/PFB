import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RentImage from "../components/Rent/RentImage";
import RentInfo from "../components/Rent/RentInfo";
import { toast } from "react-toastify";

const Rent = () => {
  const { id } = useParams();
  const [rent, setRent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/rents/${id}`)
      .then((res) => res.json())
      .then(setRent)
      .catch(() => setError("Error al cargar el alquiler"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando alquiler...</p>;
  if (error) return toast.error(error.message);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <RentImage src={rent.imageUrl} alt={rent.title} />
      <RentInfo rent={rent} />
    </div>
  );
};

export default Rent;
