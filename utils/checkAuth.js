async function isAuthenticated() {
  const token = localStorage.getItem("token");
  const res = await fetch(
    "https://music-journal-backend.herokuapp.com/auth/is-authenticated/",
    {
      headers: {
        token: token,
      },
      method: "GET",
    }
  );
  const parseResponse = await res.json();
  if (parseResponse === true) {
    return true;
  } else {
    return false;
  }
}

export { isAuthenticated };
