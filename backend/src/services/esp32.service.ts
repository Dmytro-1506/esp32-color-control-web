import net from "node:net";
import type { Color } from "../types/color.ts";

const ESP32_HOST = "192.168.4.1";
const ESP32_PORT = 8080;

let client: net.Socket | null = null;

function connectToESP32(): Promise<void> {
  return new Promise((resolve, reject) => {

    if (client && !client.destroyed) {
      resolve();
      return;
    }

    client = new net.Socket();

    client.connect(ESP32_PORT, ESP32_HOST, () => {
      console.log("Mit ESP32 verbunden");
      resolve();
    });

    client.on("error", (error) => {
      console.error("TCP-Fehler:", error.message);

      client?.destroy();
      client = null;

      reject(error);
    });
  });
}

export async function sendColorToESP32(
  color: Color
): Promise<unknown> {

  await connectToESP32();

  const command = {
    command: "setLED",
    red: color.red,
    green: color.green,
    blue: color.blue,
  };

  const message = JSON.stringify(command);

  return new Promise((resolve, reject) => {

    let response = "";

    const handleData = (data: Buffer) => {

      response += data.toString();

      try {
        const jsonResponse = JSON.parse(response);

        console.log("Antwort vom ESP32:");
        console.log(jsonResponse);

        client?.off("data", handleData);

        resolve(jsonResponse);

      } catch {
        // JSON noch nicht vollständig
      }
    };

    client!.on("data", handleData);

    client!.write(message + "\n");

    console.log(
      "Befehl an ESP32 gesendet:",
      message
    );
  });
}