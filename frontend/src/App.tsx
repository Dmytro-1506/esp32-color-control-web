import { useState } from "react";
import { RgbColorPicker } from "react-colorful";
import "./App.css";

import { sendColor } from "./api/colorApi";

function App() {
  const [color, setColor] = useState({
    r: 96,
    g: 14,
    b: 66,
  });

  const handleSetLED = async () => {
  try {
    const response = await sendColor({
      red: color.r,
      green: color.g,
      blue: color.b,
    });

    console.log("Backend:", response);
  } catch (error) {
    console.error("Fehler:", error);
  }
};

  return (
    <div className="app">
      <h1>ESP32 LED Color Control</h1>

      <div className="color-section">
          <RgbColorPicker
            className="color-picker"
            color={color}
            onChange={setColor}
          />

        <div className="color-info">

          <div
            className="selected-color"
            style={{
              backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
              color: `rgb(${color.r}, ${color.g}, ${color.b})`,
            }}
          >
          </div>
          
          <p>
            RGB: {color.r}, {color.g}, {color.b}
          </p>

          <button className="set-led-button" onClick={handleSetLED}>
            setLED
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;