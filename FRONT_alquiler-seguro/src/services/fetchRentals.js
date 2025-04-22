export async function fetchRentals() {
  const res = await fetch("http://localhost:3000/rents");
  const json = await res.json();
  console.log(json);
  return json.data.rents;
}
