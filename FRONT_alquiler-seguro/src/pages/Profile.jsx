import Avatar from "../Components/Avatar";
import useUser from "../hooks/useUser";

export default function Profile() {
  const user = useUser();

  return (
    <main>
      <h2>{user.username}</h2>
      <Avatar user={user} />
      {user.email && <p>Email: {user.email}</p>}
    </main>
  );
}
