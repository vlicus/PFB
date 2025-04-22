import avatar from "../assets/user.png";
import ApiImage from "./ApiImage";

export default function Avatar({ user }) {
  return user.avatar ? (
    <ApiImage className="avatar" name={user.avatar} alt={user.username} />
  ) : (
    <img className="avatar" src={avatar} />
  );
}
