const { VITE_API_URL } = import.meta.env;

export async function fetchRentals() {
  const res = await fetch(VITE_API_URL + "/rents");
  const json = await res.json();
  //console.log(json);
  return json.data.rents;
}
