// src/components/TodayAlerts.jsx
import React from "react";

function TodayAlerts({ clients }) {
  const today = new Date().toDateString();

  const alerts = [];

  clients.forEach((client) => {
    const { name, options } = client;
    const allOptions = [...options.activities, ...options.meals];

    allOptions.forEach((opt) => {
      const dateMatch = new Date(opt.date).toDateString() === today;
      if (dateMatch) {
        alerts.push({
          client: name,
          label: opt.label,
          time: opt.time,
          icon: opt.icon,
        });
      }
    });
  });

  if (alerts.length === 0) return null;

  return (
    <div className="today-alerts">
      <h3>Today's Events</h3>
      <ul>
        {alerts.map((alert, i) => (
          <li key={i}>
            <strong>{alert.client}:</strong> {alert.label} at {alert.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodayAlerts;
