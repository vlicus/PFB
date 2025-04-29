import RentRequestList from "../components/RentRequestList";
import useMyallRentRequests from "../hooks/useMyAllRentRequests";

export default function RentsRequested() {
  const requests = useMyallRentRequests();
  return (
    <main>
      <h2>Mis solicitudes de visita</h2>
      <RentRequestList list={requests} />
    </main>
  );
}
