import avatarDefecto from "../assets/user.png";
import ApiImage from "./ApiImage";
import "../styles/UserPrivateProfile.css";
export default function Avatar({ user }) {
  return user.avatar ? (
    <ApiImage
      className="profile-avatar"
      name={"avatar/" + user.avatar}
      alt={user.username}
    />
  ) : (
    <img className="avatar" src={avatarDefecto} />
  );
}
