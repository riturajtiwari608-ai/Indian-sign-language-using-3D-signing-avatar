const API_URL = import.meta.env.VITE_API_URL;
export async function translateText(text) {
  const response = await fetch(`${API_URL}/translate`, {
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
  const response = await fetch(`${API_URL}/sign-words`);
  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Failed to load sign words");
  }
  return response.json();
}
// const handleTranslate = async (userInput) => {
//   try {
//     const response = await fetch("http://127.0.0.1:8000/translate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ text: userInput }),
//     });

//     const data = await response.json();
//     // data will contain { gloss: [...], signs: [...] }
//     console.log("Gloss results:", data.gloss);
//     console.log("Sign files to play:", data.signs);
//   } catch (error) {
//     console.error("Error connecting to backend:", error);
//   }
// };
