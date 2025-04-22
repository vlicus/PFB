const RentImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-64 object-cover mb-4 rounded shadow"
  />
);

export default RentImage;
