import useNewRent from "../hooks/useNewRent";

export default function NewPostForm() {
  const { formState, handleSubmit, handleTextChange, handleFileChange } = useNewRent();

  return (
    <main>
      <h2>Nuevo alquiler!</h2>
      <form action={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="address">Dirección: </label>
            <input
              type="text"
              name="address"
              id="address"
              required
              onChange={handleTextChange}
              value={formState.address}
              minLength={5}
            />
          </li>
          <li>
            <label htmlFor="price">Precio: </label>
            <input
              type="text"
              name="price"
              id="price"
              required
              onChange={handleTextChange}
              value={formState.price}
            />
          </li>
          <li>
            <label htmlFor="num_rooms">Número de habitaciones: </label>
            <input
              type="text"
              name="num_rooms"
              id="num_rooms"
              required
              onChange={handleTextChange}
              value={formState.num_rooms}
            />
          </li>
          <li>
            <label htmlFor="description">Descripción: </label>
            <textarea
              name="description"
              id="description"
              onChange={handleTextChange}
              value={formState.description}
            ></textarea>
          </li>
          <li>
            <label htmlFor="photoA">Photo 1:</label>
            <input
              type="file"
              name="photoA"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
            />
          </li>
        </ul>
        <button>Enviar</button>
      </form>
    </main>
  );
}
