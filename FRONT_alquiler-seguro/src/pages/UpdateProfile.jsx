import useUserUpdate from "../hooks/useUserUpdate";
import "../styles/FormStyle.css";
export default function UpdateProfile() {
  const { handleChange, formState, handleSubmit, handleFileChange } =
    useUserUpdate();

  return (
    <main>
      <h2>Editar usuario</h2>
      <div className="updateUserContainer">
        <form action={handleSubmit}>
          <ul className="lista-form">
            <li>
              <label htmlFor="first_name">Nombre:</label>
              <input
                type="text"
                id="first_name"
                required
                value={formState.first_name}
                name="first_name"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="last_name">Apellido:</label>
              <input
                type="text"
                id="last_name"
                required
                value={formState.last_name}
                name="last_name"
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="phone_number">Número de teléfono</label>
              <input
                type="text"
                required
                id="phone_number"
                name="phone_number"
                value={formState.phone_number}
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                required
                id="bio"
                name="bio"
                value={formState.bio}
                onChange={handleChange}
              />
            </li>
            <li>
              <label htmlFor="avatar">Avatar:</label>
              <input
                className="file"
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
              />
            </li>
          </ul>
          <button>Enviar</button>
        </form>
      </div>
    </main>
  );
}
