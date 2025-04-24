const UserRatings = ({ ratings }) => {
  if (!ratings || ratings.length === 0) return <p>Sin valoraciones.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Valoraciones</h2>
      <ul className="space-y-2">
        {ratings.map((r) => (
          <li key={r.id} className="border p-3 rounded">
            <p>
              <strong>Comentario:</strong> {r.comment}
            </p>
            <p>
              <strong>Puntuación:</strong> ⭐ {r.score}/5
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRatings;
