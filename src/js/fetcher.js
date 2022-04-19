const API_URL = "https://front-br-challenges.web.app/api/v2/green-thumb/";

async function fetcher(options = {}) {
  try {
    const url = new URL(API_URL);

    Object.entries(options) //
      .forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });

    const response = await fetch(url, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Something wrong");

    return response.json();
  } catch (error) {
    console.error(error);

    return null;
  }
}

export default fetcher;
