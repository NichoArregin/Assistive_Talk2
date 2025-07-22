// src/components/ClientCalendar.jsx
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";

function ClientCalendar({ scheduledOptions }) {
  const tileContent = ({ date }) => {
    const events = scheduledOptions.filter(
      (opt) =>
        new Date(opt.date).toDateString() === date.toDateString()
    );
    return events.length > 0 ? (
      <ul className="calendar-dot">
        {events.map((evt, i) => (
          <li key={i} title={`${evt.label} at ${evt.time}`}>
            {evt.icon}
          </li>
        ))}
      </ul>
    ) : null;
  };

  return <Calendar tileContent={tileContent} />;
}

export default ClientCalendar;
