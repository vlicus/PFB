import UserTypeCard from "./UserTypeCard";
import owners from "../../assets/owners.jpeg";
import tenants from "../../assets/tenants.jpeg";

const UserTypeGrid = () => (
  <section className="my-10">
    <h2 className="text-xl font-semibold mb-6 text-center">
      ¿Propietario? ¿Inquilino?{" "}
      <span className="font-normal">tenemos la solución para ti</span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <UserTypeCard
        image={owners}
        title="Propietarios"
        text="Body text for whatever you'd like to add more to the subheading."
      />
      <UserTypeCard
        image={tenants}
        title="Inquilinos"
        text="Body text for whatever you'd like to expand on the main point."
      />
    </div>
  </section>
);

export default UserTypeGrid;
