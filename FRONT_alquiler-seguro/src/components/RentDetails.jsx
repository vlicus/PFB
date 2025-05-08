import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ApiImage from "./ApiImage";
import "../styles/RentalCard.css";
import "../styles/Buttons.css";
import useRent from "../hooks/useRent";

const RentDetailPage = () => {
  const { sendRentRequest } = useRentRequestActions();
  const totalImages = rental.images.length;

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: totalImages > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // prevArrow: <CustomPrevArrow />,
    // nextArrow: <CustomNextArrow />,
  };
  const {
    id,
    property_owner_id,
    address,
    city,
    price,
    num_rooms,
    description,
    is_available,
    photos,
    username,
  } = useRent();

  return (
    <div className="p-6">
      <h1>{city}</h1>

      <div className="p-6">
        <p>Precio: {price} €/mes</p>

        <p>Habitaciones: {num_rooms}</p>
        <p>{address}</p>
      </div>

      <h2>Descripción</h2>
      <p>{description}</p>

      {/* Carrusel de imágenes */}
      <div className="rental-slider-container">
        <Slider {...sliderSettings} className="rental-slider">
          {rental.images.map((image, index) => (
            <ApiImage
              key={index}
              name={`rent/${rental.property_owner_username}/${image}`}
              alt={`Imagen ${index + 1}`}
              className="rental-image"
            />
          ))}
        </Slider>
      </div>
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
