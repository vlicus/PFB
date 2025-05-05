export async function fetchApprovedRentals(filters) {
  const params = new URLSearchParams(filters).toString();
  const url = `${import.meta.env.VITE_API_URL}/rents/filter?${params}`;

  const res = await fetch(url);
  const json = await res.json();

  return json.data;
}
