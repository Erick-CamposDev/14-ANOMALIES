type HttpMethods = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export async function fetchAPI(
  route: string,
  method?: HttpMethods,
  body?: unknown,
) {
  const apiURL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${apiURL}/${route}`, {
      method: method ?? "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(`STATUS: ${response.status}`);
      console.log("BODY:", data);
      throw new Error(`Erro ao buscar enigma`);
    }

    return { riddleData: data, status: response.status };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
