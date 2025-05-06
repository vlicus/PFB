import { Link } from "react-router-dom";
import ApiImage from "../components/ApiImage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/RentalCard.css";

import { useRentApprovaltActions } from "../hooks/useChangeApprovedRentRequests";

const AdminRentalCard = ({ rental, onUpdate }) => {
  const { changeApproval } = useRentApprovaltActions();

  const images = rental.images?.filter((img) => img !== null) || [];

  const handleApproval = async (approval) => {
    const success = await changeApproval(rental.id, approval);
    if (success) {
      onUpdate();
    }
  };

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
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

      <h3 className="rent-card-city">{rental.city}</h3>
      <p className="rent-card-price">{rental.price} €/mes</p>
      <p className="rent-card-rooms">
        {rental.num_rooms}{" "}
        {rental.num_rooms > 1 ? "Habitaciones" : "Habitación"}
      </p>

      <div className="rental-card-buttons">
        <Link to={`/rent/${rental.id}`}>
          <button className="view-more-btn">Ver más</button>
        </Link>
        <button className="view-more-btn" onClick={() => handleApproval(1)}>
          Aceptar
        </button>
        <button className="view-more-btn" onClick={() => handleApproval(0)}>
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default AdminRentalCard;
