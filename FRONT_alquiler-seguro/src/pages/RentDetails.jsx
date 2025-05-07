import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ApiImage from "../components/ApiImage";
import "../styles/RentalCardDetails.css";
import "../styles/Buttons.css";
import useRent from "../hooks/useRent";

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} custom-prev`}
      style={{ ...style }}
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
      style={{ ...style }}
      onClick={onClick}
    >
      ›
    </button>
  );
};

export default function RentDetailPage() {
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

  const totalImages = photos?.length || 0;

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: totalImages > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots) => <ul>{dots}</ul>,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <div className="rental-card">
        <h1 className="rent-card-city">{address}</h1>
        <p className="rent-card-rooms">{city}</p>
        {/* Carrusel de imágenes */}
        <div className="relative mb-4">
          {totalImages > 0 ? (
            <Slider {...sliderSettings} className="rental-slider">
              {photos.map((image, index) => {
                return (
                  <ApiImage
                    key={index}
                    name={`rent/${username}/${image.name}`}
                    alt={`Imagen ${index + 1}`}
                    className="rental-image rental-card-image"
                  />
                );
              })}
            </Slider>
          ) : (
            <img
              src="/default-image.jpg"
              alt="sin imagen"
              className="w-full h-60 object-cover rounded"
            />
          )}
        </div>

        <p className="rent-card-price">Precio: {price} €/mes</p>
        <p className="rent-card-rooms">
          {num_rooms} {num_rooms > 1 ? "Habitaciones" : "Habitación"}
        </p>

        <p>{description}</p>

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
