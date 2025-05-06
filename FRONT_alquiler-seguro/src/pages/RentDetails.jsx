import { useState } from "react";
import { Link } from "react-router-dom";
import ApiImage from "../components/ApiImage";
import "../styles/RentalCard.css";
import "../styles/Buttons.css";
import useRent from "../hooks/useRent";

export default function RentDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    property_owner_id,
    address,
    city,
    price,
    num_rooms,
    description,
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
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <div className="rental-card">
        <h1 className="rent-card-city">{address}</h1>
        <p className="rent-card-rooms">{city}</p>
        <p className="rent-card-price">{price} €/mes</p>
        <p className="rent-card-rooms">{num_rooms} habitaciones</p>

        {/* Carrusel de imágenes */}
        <div className="relative mb-4">
          {totalImages > 0 ? (
            <ApiImage
              name={`rent/${username}/${images[currentImageIndex].name}`}
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
          <p>{description}</p>
        </div>

        {totalImages > 1 && (
          <div
            style={{ listStyle: "none" }}
            className="flex justify-center mb-6"
          >
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

        <h3 className="rental-owner">
          Publicado por{" "}
          <Link to={`/profile/${property_owner_id}`} className="owner-link">
            @{username}
          </Link>
        </h3>
      </div>
    </div>
  );
}
