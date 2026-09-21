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
          color={color}
          onChange={setColor}
        />

        <div className="color-info">
          
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