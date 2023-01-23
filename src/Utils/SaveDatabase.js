export default async function SaveDatabase(userInfo) {
  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    };
    const data = await fetch(
      "https://parlour-server-mrkpro360.vercel.app/users",
      config
    );
    return data;
  } catch (err) {
    console.error(err);
  }
}
