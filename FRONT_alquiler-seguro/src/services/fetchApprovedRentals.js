export async function fetchApprovedRentals() {
  const res = await fetch("http://localhost:3000/rents/approved");
  const json = await res.json();
  //console.log(json);
  return json.data.rents;
}
