import React, { useState } from "react";
import Rating from "./UserRatings";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import avatarDefecto from "../../assets/user.png";
import { Link } from "react-router-dom";
import "../../styles/ReviewCard.css";
import ApiImage from "../ApiImage";

export default function Review({ ratings }) {
  const [index, setIndex] = useState(0);

  const currentReview = ratings[index] || {};
  const { renter_username, rating, rating_date, comment, renter_id } = currentReview;
  const avatar = currentReview?.renter_avatar;

  const reviewDate = new Date(rating_date).toLocaleString("es-ES", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const checkNumber = (number) => {
    if (number > ratings.length - 1) {
      return 0;
    } else if (number < 0) {
      return ratings.length - 1;
    }
    return number;
  };

  const nextPerson = () => {
    setIndex((prevIndex) => checkNumber(prevIndex + 1));
  };

  const prevPerson = () => {
    setIndex((prevIndex) => checkNumber(prevIndex - 1));
  };

  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * ratings.length);
    if (randomNumber === index) {
      randomNumber = checkNumber(randomNumber + 1);
    }
    setIndex(checkNumber(randomNumber));
  };

  return (
    <article className="review">
      <div className="img-container">
        {avatar ? (
          <ApiImage className="profile-avatar" name={"avatar/" + avatar} alt={renter_username} />
        ) : (
          <img className="profile-avatar" src={avatarDefecto} alt={renter_username} />
        )}
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>

      <h4 className="author">
        <Link to={`/profile/${renter_id}`}>@{renter_username}</Link>
      </h4>
      <Rating rating={rating} />
      <p className="job">{reviewDate}</p>
      <p className="info">{comment}</p>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      <button className="random-btn" onClick={randomPerson}>
        Comentario aleatorio
      </button>
    </article>
  );
}
