import { useState } from "react";
import { Link } from "react-router-dom";
import ApiImage from "../components/ApiImage";
import { useRentApprovaltActions } from "../hooks/useChangeApprovedRentRequests";

const AdminRentalCard = ({ rental, onUpdate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { changeApproval } = useRentApprovaltActions();
  const handleApproval = async (approval) => {
    const success = await changeApproval(rental.id, approval);
    if (success) {
      onUpdate();
    }
  };

  const images = rental.images
    ? rental.images.filter((img) => img !== null)
    : [];

  const totalImages = images.length;

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="border p-4 rounded-lg shadow relative">
      {/* Carrusel de imágenes */}
      <div className="relative">
        {totalImages > 0 ? (
          <ApiImage
            name={`rent/${rental.property_owner_username}/${images[currentImageIndex]}`}
            alt={`Imagen ${currentImageIndex + 1}`}
            height={160}
            className="w-full object-cover rounded"
          />
        ) : (
          <img
            src="/default-image.jpg"
            alt="sin imagen"
            className="w-full h-40 object-cover rounded"
          />
        )}

        {totalImages > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow"
            >
              ›
            </button>
          </>
        )}
      </div>

      {totalImages > 1 && (
        <div className="flex justify-center mt-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`h-2 w-2 mx-1 rounded-full ${
                index === currentImageIndex ? "bg-blue-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Información del alquiler */}
      <h3 className="text-xl font-semibold mt-2">{rental.title}</h3>
      <p className="text-gray-600">{rental.address}</p>
      <p className="font-bold text-blue-600">{rental.price} €/mes</p>

      <Link to={`/rent/${rental.id}`}>
        <button className="mt-2 text-sm text-white bg-blue-500 px-4 py-1 rounded">
          Ver más
        </button>
      </Link>
      <button
        className="mt-2 text-sm text-white bg-blue-500 px-4 py-1 rounded"
        onClick={() => handleApproval(1)}
      >
        Aceptar
      </button>
      <button
        className="mt-2 text-sm text-white bg-blue-500 px-4 py-1 rounded"
        onClick={() => handleApproval(0)}
      >
        Rechazar
      </button>
    </div>
  );
};

export default AdminRentalCard;
