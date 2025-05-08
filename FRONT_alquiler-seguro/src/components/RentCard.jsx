import { Link } from "react-router-dom";
import { useRentRequestActions } from "../hooks/useRentRequestActions";
import ApiImage from "../components/ApiImage";
import Slider from "react-slick";

import "../styles/RentalCard.css";
import "../styles/Buttons.css";

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} custom-prev`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      ‹
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} custom-next`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      ›
    </button>
  );
};

const RentCard = ({ rental }) => {
  const { sendRentRequest } = useRentRequestActions();
  const totalImages = rental.images.length;

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: totalImages > 0,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="rental-card">
      <div className="rental-slider-container">
        <Slider key={totalImages} {...sliderSettings} className="rental-slider">
          {rental.images.map((image, index) => (
            <ApiImage
              key={index}
              name={`rent/${rental.property_owner_username}/${image}`}
              alt={`Imagen ${index + 1}`}
              className="rental-image rental-card-image"
            />
          ))}
        </Slider>
      </div>

      <p className="rent-card-city">{rental.city}</p>
      <p className="rent-card-price">{rental.price} €/mes</p>
      <p className="rent-card-rooms">
        {rental.num_rooms}{" "}
        {rental.num_rooms > 1 ? "Habitaciones" : "Habitación"}
      </p>
      <p className="rental-owner">
        Publicado por{" "}
        <Link to={`/profile/${rental.property_owner_id}`}>
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

export default RentCard;
