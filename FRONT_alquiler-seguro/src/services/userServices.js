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
  console.log(res);

  let json = await res.json();

  if (!res.ok) {
    throw new Error(json.message);
  }

  return json;
}

export async function loginService(userData) {
  console.log(userData);

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
