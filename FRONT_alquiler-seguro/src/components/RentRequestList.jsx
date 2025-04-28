import RentRequest from "./RentRequest/RentRequest";

export default function RentRequestList({ list }) {
  return (
    <ul>
      {list.map((rentRequest) => (
        <li key={rentRequest.id}>
          <RentRequest rentRequest={rentRequest} />
        </li>
      ))}
    </ul>
  );
}
