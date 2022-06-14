async function isAuthenticated() {
  const token = localStorage.getItem("token");
  const res = fetch("http://localhost:3000/auth/is-authenticated/", {
    headers: {
      token: token,
    },
    method: "GET",
  });
  const parseResponse = await res.json();
  if (parseResponse === true) {
    return true;
  } else {
    return false;
  }
}

export {isAuthenticated}
