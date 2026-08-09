const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = configuredApiUrl?.replace(/\/+$/, "");

function apiUrl(path) {
  if (!API_URL) {
    throw new Error(
      "The API is not configured. Set VITE_API_URL to your deployed backend URL and redeploy."
    );
  }
  return `${API_URL}${path}`;
}

export async function translateText(text) {
  const response = await fetch(apiUrl("/translate"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Translation request failed");
  }

  return response.json();
}

export async function fetchSignWords() {
  const response = await fetch(apiUrl("/sign-words"));
  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Failed to load sign words");
  }
  return response.json();
}
