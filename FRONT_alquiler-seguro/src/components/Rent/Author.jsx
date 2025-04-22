export default function Author({ name, avatar }) {
  return (
    <p className="author">
      Dueño: {name} {avatar} && <img src={avatar} alt={name} width="32px" />
    </p>
  );
}
