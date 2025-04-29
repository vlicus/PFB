export async function fetchNotApprovedRentals() {
  const res = await fetch("http://localhost:3000/rents/notapproved");
  const json = await res.json();
  //console.log(json);
  return json.data.rents;
}
