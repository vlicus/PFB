import { Rating } from "react-simple-star-rating";
import { Link, useNavigate } from "react-router-dom";
import useRentRequest from "../hooks/useRentRequest";
import useRating from "../hooks/useRating";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ApiImage from "../components/ApiImage";

import "../styles/RentRequestDetail.css";

export default function RentRequestDetail() {
  const { token } = useAuth();
  const {
    address,
    status,
    owner_username,
    property_owner_id,
    photos,
    price,
    num_rooms,
    renter_username,
    renter_id,
  } = useRentRequest();
  const navigate = useNavigate();
  const [rate, setRating] = useState(0);
  const { handleChange, formState, handleSubmit } = useRating();
  const { myUsername } = useAuth();

  const statusLabels = {
    PENDING: "Pendiente",
    APPROVED: "Aprobado",
    ACTIVE: "Activo",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
    REJECTED: "Rechazado",
  };
  formState.rating = rate;
  if (!token) {
    navigate("/login");
  }

  async function handleRating(rate) {
    setRating(rate);
  }

  return (
    <main className="rent-request-detail-main">
      <div className="rent-request-detail">
        {address && <p className="rent-card-city">Dirección: {address}</p>}
        {price && <p className="rent-card-price">Precio: {price}</p>}
        {num_rooms && (
          <p className="rent-card-rooms">Nº habitaciones: {num_rooms}</p>
        )}
        {myUsername !== renter_username && (
          <Link to={"/profile/" + renter_id}>
            <>
            {renter_username && (
              <p className="rental-owner">Solicitante: {renter_username}</p>
            )}
          </>
          </Link>
        )}
        {myUsername !== owner_username && (
          <Link to={"/profile/" + property_owner_id}>
            (
          <>
            {owner_username && (
              <p className="rental-owner">Casero: {owner_username}</p>
            )}
          </>
          </Link>
        )
        )}
        <p>Estado: {statusLabels[status] || status}</p>
        {photos?.length > 0 && (
          <div className="rent-request-slider">
            <Slider
              dots={true}
              arrows={true}
              infinite={false}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {photos.map((photo) => (
                <div key={photo.id}>
                  <ApiImage
                    name={`rent/${owner_username}/${photo.name}`}
                    alt={photo.name}
                    className="slider-request-image"
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
        {status != "PENDING" && (
          <form onSubmit={handleSubmit}>
            <Rating
              initialValue={1}
              allowFraction={true}
              onClick={handleRating}
              fillColor={"#01B0F1"}
            />
            <label htmlFor="comment"></label>
            <textarea
              id="comment"
              name="comment"
              required
              placeholder="Aquí puede describir su experiencia"
              value={formState.comment}
              onChange={handleChange}
            />
            <button>Enviar</button>
          </form>
        )}
      </div>
    </main>
  );
}
