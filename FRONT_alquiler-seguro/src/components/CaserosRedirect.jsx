import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CaserosRedirect = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleClick = () => {
    if (token) {
      navigate("/profile/rent/new");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="section-title">
      <h2 className="section-sub-title">Alquila tu propiedad con seguridad y tranquilidad</h2>

      <div className="space-y-4">
        <div>
          <h3 className="section-sub-title">Seguridad de pagos</h3>
          <p>Body text for whatever you’d like to expand on the main point.</p>

          <div>
            <h3 className="section-sub-title">Publica de forma fácil, rápida y segura</h3>
            <p>
              Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes.
            </p>
          </div>

          <div>
            <h3 className="section-sub-title">Nos encargamos de los trámites</h3>
            <p>
              Body text for whatever you’d like to add more to the main point. It provides details,
              explanations, and context.
            </p>
          </div>
        </div>
        <div className="md:w-1/2"></div>
        <button onClick={handleClick} className="rents-btn">
          Publica tu propiedad
        </button>
      </div>
    </section>
  );
};

export default CaserosRedirect;
