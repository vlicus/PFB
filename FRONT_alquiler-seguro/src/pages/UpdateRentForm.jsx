import useUpdateRent from "../hooks/useUpdateRent";
import "../styles/FormStyle.css";
import { useParams } from "react-router-dom";

export default function UpdateRentForm() {
  const { rentId } = useParams();
  const { formState, handleSubmit, handleTextChange, handleFileChange } =
    useUpdateRent();
  return (
    <main>
      <h2>Actualiza tu alquiler!</h2>
      <div className="newrentcontainer">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleSubmit(formData, rentId);
          }}
        >
          <ul className="lista-form">
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
                cols="30"
                rows="10"
                onChange={handleTextChange}
                value={formState.description}
                placeholder="Descripción de la vivienda"
              ></textarea>
            </li>
            <li>
              <label htmlFor="photos">Photos:</label>
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
          <button>Enviar</button>
        </form>
      </div>
    </main>
  );
}
