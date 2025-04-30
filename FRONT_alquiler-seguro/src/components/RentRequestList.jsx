import RentRequest from "./RentRequest/RentRequest";

export default function RentRequestList({ list }) {
  return (
    <ul>
      {list.map((rentRequest) => (
        <li className="rent-request-list-li" key={rentRequest.id}>
          <RentRequest rentRequest={rentRequest} />
        </li>
      ))}
    </ul>
  );
}
