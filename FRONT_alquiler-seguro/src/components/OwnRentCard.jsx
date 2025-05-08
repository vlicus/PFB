import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import ApiImage from "../components/ApiImage";
import Slider from "react-slick";

import "../styles/OwnRental.css";

const OwnRentalCard = ({ rental }) => {
  const sliderRef = useRef(null);
  const images = rental.images?.filter((img) => img !== null) || [];
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
    totalImages > 1
      ? sliderRef.current.slickPrev()
      : sliderRef.current.slickGoTo(0);
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    totalImages > 1
      ? sliderRef.current.slickNext()
      : sliderRef.current.slickGoTo(0);
  };

  return (
    <div className="rental-card">
      <div className="rental-slider-wrapper">
        <button
          className="custom-prev"
          onClick={handlePrev}
          aria-label="Anterior imagen"
        >
          ‹
        </button>

        <div className="rental-slider-container">
          <Slider
            ref={sliderRef}
            key={totalImages}
            {...sliderSettings}
            className="rental-slider"
          >
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

        <button
          className="custom-next"
          onClick={handleNext}
          aria-label="Siguiente imagen"
        >
          ›
        </button>
      </div>

      <h1 className="rent-card-city">{rental.city}</h1>
      <h2 className="rent-card-price">{rental.price} €/mes</h2>
      <p className="rent-card-rooms">
        {rental.num_rooms}{" "}
        {rental.num_rooms > 1 ? "Habitaciones" : "Habitación"}
      </p>
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
        <HashLink to={`/rent/${rental.id}/update/#updateRent`}>
          <button className="view-more-btn">Editar</button>
        </HashLink>
      </div>
    </div>
  );
};

export default OwnRentalCard;
