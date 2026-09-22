export interface Color {
  red: number;
  green: number;
  blue: number;
}

export async function sendColor(color: Color) {
  const response = await fetch("http://localhost:3000/api/color", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(color),
  });

  if (!response.ok) {
    throw new Error("Fehler beim Senden der Farbe");
  }

  return response.json();
}