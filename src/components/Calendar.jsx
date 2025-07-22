import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";

function ClientCalendar({ scheduledOptions }) {
  const tileContent = ({ date }) => {
    const optionsForDate = scheduledOptions.filter(
      (opt) => new Date(opt.date).toDateString() === date.toDateString()
    );

    return optionsForDate.length > 0 ? (
      <ul className="calendar-dot">
        {optionsForDate.map((opt, idx) => (
          <li key={idx} title={`${opt.label} at ${opt.time}`}>
            {opt.icon}
          </li>
        ))}
      </ul>
    ) : null;
  };

  return (
    <div>
      <Calendar tileContent={tileContent} />
    </div>
  );
}

export default ClientCalendar;
