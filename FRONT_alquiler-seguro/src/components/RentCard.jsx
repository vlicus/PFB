import { useState } from "react";
import { Link } from "react-router-dom";
import { useRentRequestActions } from "../hooks/useRentRequestActions";
import ApiImage from "../components/ApiImage";
import "../styles/RentalCard.css";
import "../styles/Buttons.css";

const RentalCard = ({ rental }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { sendRentRequest } = useRentRequestActions();

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
    <div className="rental-card">
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
      <p className="rental-owner">
        Publicado por{" "}
        <Link
          to={`/profile/${rental.property_owner_id}`}
          className="owner-link"
        >
          @{rental.property_owner_username}
        </Link>
      </p>
      <div className="rental-card-buttons">
        <Link to={`/rent/${rental.id}`}>
          <button className="view-more-btn">Ver más</button>
        </Link>
        <button
          className="book-visit-btn"
          onClick={() => sendRentRequest(rental.id)}
        >
          Reservar visita
        </button>
      </div>
    </div>
  );
};

export default RentalCard;
