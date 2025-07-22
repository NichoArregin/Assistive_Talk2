import React from "react";

function TodayAlerts({ clients }) {
  const today = new Date().toDateString();

  const todaysEvents = [];

  clients.forEach((client) => {
    [...client.activities, ...client.meals].forEach((event) => {
      if (new Date(event.date).toDateString() === today) {
        todaysEvents.push({
          label: event.label,
          icon: event.icon,
          time: event.time,
          clientName: client.name,
        });
      }
    });
  });

  return (
    <div className="today-alerts">
      {todaysEvents.length === 0 ? (
        <p>No events today</p>
      ) : (
        <ul>
          {todaysEvents.map((e, i) => (
            <li key={i}>
              <strong>{e.clientName}</strong>: {e.label} {e.icon} at {e.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodayAlerts;
