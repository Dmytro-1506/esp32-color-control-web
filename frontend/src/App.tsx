import { useState } from "react";
import { RgbColorPicker } from "react-colorful";
import "./App.css";

function App() {
  const [color, setColor] = useState({
    r: 96,
    g: 14,
    b: 66,
  });

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

          <button className="set-led-button">
            setLED
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;