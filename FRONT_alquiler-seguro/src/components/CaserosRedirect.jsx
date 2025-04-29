import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CaserosRedirect = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleClick = () => {
    if (token) {
      navigate("/rent/register");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 py-10 px-6">
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Alquila tu propiedad con seguridad y tranquilidad
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Seguridad de pagos</h3>
            <p className="text-gray-600 text-sm">
              Body text for whatever you’d like to expand on the main point.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Publica de forma fácil, rápida y segura
            </h3>
            <p className="text-gray-600 text-sm">
              Body text for whatever you’d like to say. Add main takeaway
              points, quotes, anecdotes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Nos encargamos de los trámites</h3>
            <p className="text-gray-600 text-sm">
              Body text for whatever you’d like to add more to the main point.
              It provides details, explanations, and context.
            </p>
          </div>
        </div>
        <div className="md:w-1/2"></div>
        <button
          onClick={handleClick}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Publica tu propiedad
        </button>
      </div>
    </section>
  );
};

export default CaserosRedirect;
