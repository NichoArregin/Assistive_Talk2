// src/components/Alerts.jsx
import React from "react";

function Alerts({ alerts }) {
  if (alerts.length === 0) return null;

  return (
    <div className="alerts-bar">
      <h3>🔔 Today's Reminders:</h3>
      <ul>
        {alerts.map((alert, idx) => (
          <li key={idx}>
            <strong>{alert.label}</strong> for <em>{alert.clientName}</em> at{" "}
            {alert.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Alerts;
