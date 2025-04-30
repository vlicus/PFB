import { useState } from "react";
import { Link } from "react-router-dom";
import ApiImage from "./ApiImage";
import "../styles/RentalCard.css";
import "../styles/Buttons.css";
import useRent from "../hooks/useRent";

const RentDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    id,
    property_owner_id,
    address,
    price,
    num_rooms,
    description,
    is_available,
    photos,
    username,
  } = useRent();

  const images = photos?.filter((img) => img !== null) || [];
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
    <div className="p-6">
      <h1>{address}</h1>

      <div className="p-6">
        <p>Precio: {price} €/mes</p>

        <p>Habitaciones: {num_rooms}</p>
      </div>

      <h2>Descripción</h2>
      <p>{description}</p>

      {/* Carrusel de imágenes */}
      <div className="relative mb-4">
        {totalImages > 0 ? (
          <ApiImage
            name={`rent/${username}/${images[currentImageIndex]}`}
            alt={`Imagen ${currentImageIndex + 1}`}
            height={300}
            className="w-full object-cover rounded"
          />
        ) : (
          <img
            src="/default-image.jpg"
            alt="sin imagen"
            className="w-full h-60 object-cover rounded"
          />
        )}

        {totalImages > 1 && (
          <>
            <button onClick={handlePrev} className="carousel-button left">
              ‹
            </button>
            <button onClick={handleNext} className="carousel-button right">
              ›
            </button>
          </>
        )}
      </div>

      {totalImages > 1 && (
        <div className="flex justify-center mb-6">
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

      {/* Publicado por */}
      <h3 className="text-lg mt-4">
        Publicado por{" "}
        <Link
          to={`/users/${property_owner_id}/history`}
          className="text-blue-600 font-semibold hover:underline"
        >
          @{username}
        </Link>
      </h3>
    </div>
  );
};

export default RentDetailPage;
