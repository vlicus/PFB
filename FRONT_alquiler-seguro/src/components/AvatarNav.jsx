import avatarDefecto from "../assets/noProfilePic.png";
import ApiImage from "./ApiImage";
import "../styles/UserPrivateProfile.css";
export default function AvatarNav({ user }) {
  return user.avatar ? (
    <ApiImage className="profile-avatar-nav" name={"avatar/" + user.avatar} alt={user.username} />
  ) : (
    <img className="profile-avatar-nav" src={avatarDefecto} />
  );
}
