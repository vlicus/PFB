import "../../styles/UserTypeCard.css";
import { useNavigate } from "react-router-dom";

const UserTypeCard = ({ image, title, text, path }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };
  return (
    <div className="card" onClick={handleClick}>
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default UserTypeCard;
