import { Link } from "react-router-dom";
import ApiImage from "../components/ApiImage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/RentalCard.css";

const OwnRentalCard = ({ rental }) => {
  const images = rental.images?.filter((img) => img !== null) || [];

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <article>
      <div className="rental-card">
        <div className="rental-slider-container">
          {images.length > 0 ? (
            <Slider {...sliderSettings}>
              {images.map((img, idx) => (
                <div key={idx}>
                  <ApiImage
                    name={`rent/${rental.property_owner_username}/${img}`}
                    alt={`Imagen ${idx + 1}`}
                    className="rental-image"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img
              src="/default-image.jpg"
              alt="sin imagen"
              className="rental-image"
            />
          )}
        </div>

        <p className="rent-card-city">{rental.city}</p>
        <p className="rent-card-price">{rental.price} €/mes</p>
        <p className="rent-card-rooms">
          {rental.num_rooms}{" "}
          {rental.num_rooms > 1 ? "Habitaciones" : "Habitación"}
        </p>
        <p className="rental-owner">
          Publicado por{" "}
          <span>
            <Link
              to={`/profile/${rental.property_owner_id}`}
              className="owner-link"
            >
              @{rental.property_owner_username}
            </Link>
          </span>
        </p>
        <div className="rental-card-buttons">
          <Link to={`/rent/${rental.id}`}>
            <button className="view-more-btn">Ver más</button>
          </Link>
          <Link to={`/rent/${rental.id}/update`}>
            <button className="view-more-btn">Editar</button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default OwnRentalCard;
