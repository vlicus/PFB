import { useNavigate } from "react-router-dom";
import "../styles/Buttons.css";
const RentButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Redirige al endpoint /rents
    navigate("/rents");
  };

  return (
    <div>
      <h3 className="section-title">Descubre tu próximo Hogar</h3>
      <article>
        <h4 className="section-sub-title">Múltiples Opciones</h4>
        <p>
          Contamos con una amplia variedad de alternativas que se adaptan a tus
          necesidades. Ya sea que busques algo rápido, económico o con servicios
          premium incluidos, encontrarás la opción ideal para ti sin
          complicaciones.
        </p>
        <h4 className="subheading">Aplica de forma fácil, rápida y segura</h4>
        <p>
          Completa el proceso en pocos pasos y sin dolores de cabeza. Nuestra
          plataforma está diseñada para que puedas realizar todo desde tu móvil
          o computadora, con total seguridad y en menos tiempo del que imaginas.
        </p>
        <h4 className="subheading">Nos encargamos de los trámites</h4>
        <p>
          Olvídate del papeleo y de las gestiones complicadas. Nuestro equipo se
          ocupa de todo el proceso por ti, desde la documentación hasta el
          contacto con las partes implicadas. Tú solo decides, nosotros hacemos
          el resto.
        </p>
      </article>
      <div className="rents-btn-container">
        <button className="rents-btn" onClick={handleButtonClick}>
          Busca tu próxima vivienda
        </button>
      </div>
    </div>
  );
};

export default RentButton;
