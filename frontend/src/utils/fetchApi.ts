type HttpMethods = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export async function fetchAPI(
  route: string,
  method: HttpMethods = "GET",
  body?: unknown,
) {
  const apiURL = import.meta.env.VITE_API_URL;

  try {
    const response = await fetch(`${apiURL}${route}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    return { riddleData: data, status: response.status, ok: response.ok };
  } catch (error) {
    console.log(error);
  }
  return {
    riddleData: {
      message: "O servidor não foi inicializado",
    },
    status: 500,
    ok: false,
  };
}
