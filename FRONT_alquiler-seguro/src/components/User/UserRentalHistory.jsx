const RentalHistory = ({ rentals }) => {
  if (!rentals || rentals.length === 0)
    return <p>Sin historial de alquileres.</p>;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Historial de alquileres</h2>
      <ul className="space-y-2">
        {rentals.map((rent) => (
          <li key={rent.id} className="border p-3 rounded">
            <p>
              <strong>Dirección:</strong> {rent.address}
            </p>
            <p>
              <strong>Fecha:</strong> {rent.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentalHistory;
