import UserTypeCard from "./UserTypeCard";
import owners from "../../assets/owners2.png";
import tenants from "../../assets/tenants2.png";

const UserTypeGrid = () => (
  <section className="User-Cards">
    <h2 className="user-type-title">
      ¿Propietario? ¿Inquilino?
      <br />
      <span>Tenemos la solución para ti</span>
    </h2>
    <div className="user-type-grid">
      <UserTypeCard
        image={owners}
        title="Propietarios"
        text="Gestión segura, transparente y sin complicaciones."
        path="/register"
      />
      <UserTypeCard
        image={tenants}
        title="Inquilinos"
        text="Encuentra tu nuevo hogar con total confianza."
        path="/register"
      />
    </div>
  </section>
);

export default UserTypeGrid;
