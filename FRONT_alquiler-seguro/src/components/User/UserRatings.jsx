import React from "react";
import { Rating as StarRating } from "react-simple-star-rating";

export default function Rating({ rating = 0 }) {
  return (
    <span className="rating">
      <StarRating
        readonly
        initialValue={rating}
        size={20}
        SVGstyle={{ display: "inline-block" }}
        allowFraction
      />
    </span>
  );
}
