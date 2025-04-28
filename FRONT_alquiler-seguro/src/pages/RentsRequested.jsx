import RentRequestList from "../components/RentRequestList";
import useAllRentRequests from "../hooks/useAllRentRequests";

export default function RentsRequested() {
  const requests = useAllRentRequests();
  return (
    <main>
      <h2>Solicitudes de visita</h2>
      <RentRequestList list={requests} />
    </main>
  );
}
