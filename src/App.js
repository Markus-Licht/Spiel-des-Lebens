import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [message, setMessage] = useState("");
  const [previousHour, setPreviousHour] = useState(null);

  useEffect(() => {
    updateTime();
    const interval = setInterval(() => {
      updateTime();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isSwitchOn) {
      const currentHour = new Date().getHours();
      if (currentHour !== previousHour) {
        updateMessage();
        setPreviousHour(currentHour);
      }
    } else {
      setMessage("");
    }
  }, [isSwitchOn, currentTime]);

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    setCurrentTime(`${hours}:${minutes}`);
  }

  function updateMessage() {
    const currentHour = new Date().getHours();
    setMessage(currentHour % 2 === 0 ? "Mit der rechten Hand" : "Mit der linken Hand");
    if (isSwitchOn) {
      alert(`Stundenwechsel: ${message}`);
    }
  }

  return (
    <div className="app-container">
      <h1>Spiel des Lebens</h1>
      <h2>{currentTime}</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isSwitchOn}
            onChange={() => setIsSwitchOn(!isSwitchOn)}
          />
          Aktivieren
        </label>
      </div>
      {isSwitchOn && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
