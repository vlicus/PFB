import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useRentRequestActions } from "../hooks/useRentRequestActions";
import ApiImage from "../components/ApiImage";
import Slider from "react-slick";

import "../styles/RentalCard.css";
import "../styles/Buttons.css";

const RentCard = ({ rental }) => {
  const { sendRentRequest } = useRentRequestActions();
  const sliderRef = useRef(null);
  const images = rental.images || [];
  const totalImages = images.length;

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: totalImages > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handlePrev = () => {
    if (!sliderRef.current) return;
    if (totalImages > 1) {
      sliderRef.current.slickPrev();
    } else {
      sliderRef.current.slickGoTo(0);
    }
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    if (totalImages > 1) {
      sliderRef.current.slickNext();
    } else {
      sliderRef.current.slickGoTo(0);
    }
  };

  return (
    <div className="rental-card">
      <div className="rental-slider-wrapper">
        <button className="custom-prev" onClick={handlePrev} aria-label="Anterior imagen">
          ‹
        </button>

        <div className="rental-slider-container">
          <Slider ref={sliderRef} key={totalImages} {...sliderSettings} className="rental-slider">
            {images.map((image, index) => (
              <ApiImage
                key={index}
                name={`rent/${rental.property_owner_username}/${image}`}
                alt={`Imagen ${index + 1}`}
                className="rental-image rental-card-image"
              />
            ))}
          </Slider>
        </div>

        <button className="custom-next" onClick={handleNext} aria-label="Siguiente imagen">
          ›
        </button>
      </div>

      <p className="rent-card-city">{rental.city}</p>
      <p className="rent-card-price">{rental.price} €/mes</p>
      <p className="rent-card-rooms">
        {rental.num_rooms} {rental.num_rooms > 1 ? "Habitaciones" : "Habitación"}
      </p>
      <p className="rental-owner">
        Publicado por{" "}
        <Link to={`/profile/${rental.property_owner_id}`}>@{rental.property_owner_username}</Link>
      </p>

      <div className="rental-card-buttons">
        <Link to={`/rent/${rental.id}`}>
          <button className="view-more-btn">Ver más</button>
        </Link>
        <button className="book-visit-btn" onClick={() => sendRentRequest(rental.id)}>
          Reservar visita
        </button>
      </div>
    </div>
  );
};

export default RentCard;
