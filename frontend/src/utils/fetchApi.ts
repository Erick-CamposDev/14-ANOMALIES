type HttpMethods = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export async function fetchAPI(route: string, method?: HttpMethods) {
  const apiURL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${apiURL}/${route}`, {
      method: method ?? "GET",
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar enigma`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
