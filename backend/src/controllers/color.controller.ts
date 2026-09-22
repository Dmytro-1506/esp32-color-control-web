import type { Request, Response } from "express";
import { sendColorToESP32 } from "../services/esp32.service.js";
import type { Color } from "../types/color.ts";

export const sendColor = async (req: Request, res: Response) => {
  const { red, green, blue } = req.body;

  console.log("Farbe erhalten:");
  console.log("Red:", red);
  console.log("Green:", green);
  console.log("Blue:", blue);

  const color: Color = {
    red,
    green,
    blue,
  };

  try {
    const esp32Response = await sendColorToESP32(color);

    console.log("Antwort vom ESP32:");
    console.log(esp32Response);

    res.json(esp32Response);
  } catch (error) {
    console.error(
      "Fehler beim Senden der Farbe an ESP32:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "ESP32 konnte nicht erreicht werden",
    });
  }
};

export const turnLEDOff = async (req: Request, res: Response) => {
  const color: Color = {
    red: 0,
    green: 0,
    blue: 0,
  };

  try {
    const esp32Response = await sendColorToESP32(color);

    console.log("Antwort vom ESP32:");
    console.log(esp32Response);

    res.json(esp32Response);
  } catch (error) {
    console.error(
      "Fehler beim Ausschalten des LEDs:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "ESP32 konnte nicht erreicht werden",
    });
  }
};
