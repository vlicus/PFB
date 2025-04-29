const { VITE_API_URL } = import.meta.env;

export async function registerService(userData) {
  //Opción para que el back no se queje:
  //delete userData.passwordRepeat;

  let res = await fetch(VITE_API_URL + "/users/register", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function loginService(userData) {
  let res = await fetch(VITE_API_URL + "/users/login", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function validationService(regcode) {
  let res = await fetch(VITE_API_URL + "/validation/" + regcode);
  let json = await res.json();
  if (!res.ok) {
    throw new Error(json.message);
  }
}

export async function ratingServiceOwner(rating, property_owner_id, id, token) {
  let res = await fetch(VITE_API_URL + "/user/" + property_owner_id + "/" + id + "/votes", {
    method: "POST",
    body: JSON.stringify(rating),
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  let json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function ratingServiceRenter(rating, renter_id, id, token) {
  let res = await fetch(VITE_API_URL + "/user/" + renter_id + "/" + id + "/votes", {
    method: "POST",
    body: JSON.stringify(rating),
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  let json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}
