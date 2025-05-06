import useNewRent from "../hooks/useNewRent";

export default function NewPostForm() {
  const { formState, handleSubmit, handleTextChange, handleFileChange } =
    useNewRent();

  return (
    <main>
      <div className="form-card">
        <h2>Datos del alquiler</h2>
        <form action={handleSubmit}>
          <ul className="lista-form">
            <li>
              <label htmlFor="address">Dirección</label>
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
              <label htmlFor="city">Ciudad</label>
              <input
                type="text"
                name="city"
                id="city"
                required
                onChange={handleTextChange}
                value={formState.city}
                minLength={3}
              />
            </li>
            <li>
              <label htmlFor="price">Precio</label>
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
              <label htmlFor="num_rooms">Número de habitaciones</label>
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
              <label htmlFor="description">Descripción</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                onChange={handleTextChange}
                value={formState.description}
                placeholder="Descripción de la vivienda"
              ></textarea>
            </li>
            <li>
              <label htmlFor="photos">Fotos</label>
              <input
                className="file"
                type="file"
                name="photos"
                id="photos"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                multiple
              />
            </li>
          </ul>
          <button>Crear</button>
        </form>
      </div>
    </main>
  );
}
