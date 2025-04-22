import { Link } from "react-router-dom";

const RentalCard = ({ rental }) => (
  <div className="border p-4 rounded-lg shadow">
    <img
      src={rental.imageUrl}
      alt={rental.title}
      className="w-full h-40 object-cover rounded"
    />
    <h3 className="text-xl font-semibold mt-2">{rental.title}</h3>
    <p className="text-gray-600">{rental.address}</p>
    <p className="font-bold text-blue-600">{rental.price} €/mes</p>
    <Link to={`/rent/${rental.id}`}>
      <button className="mt-2 text-sm text-white bg-blue-500 px-4 py-1 rounded">
        Ver más
      </button>
    </Link>
  </div>
);

export default RentalCard;
