export default async function SetAuthToken(user, logout) {
  try {
    const currentuser = {
      email: user.email,
    };

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentuser),
    };

    const res = await fetch(
      "https://parlour-server-mrkpro360.vercel.app/jwt",
      config
    );
    const data = await res.json();
    localStorage.setItem("parlour-token", data.token);

    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("parlour-token");
      return logout();
    }

    return data;
  } catch (err) {
    console.error(err);
  }
}
