import avatarDefecto from "../assets/noProfilePic.png";
import ApiImage from "./ApiImage";
import "../styles/UserPrivateProfile.css";
export default function Avatar({ user }) {
  return user.avatar ? (
    <ApiImage className="profile-avatar" name={"avatar/" + user.avatar} alt={user.username} />
  ) : (
    <img className="profile-avatar" src={avatarDefecto} />
  );
}
