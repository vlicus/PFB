const RentInfo = ({ rent }) => (
  <div>
    <p className="text-gray-700 mb-2">{rent.description}</p>
    <p className="font-semibold">Dirección: {rent.address}</p>
    <p className="text-lg font-bold text-blue-600 mt-2">{rent.price} €/mes</p>
  </div>
);

export default RentInfo;
