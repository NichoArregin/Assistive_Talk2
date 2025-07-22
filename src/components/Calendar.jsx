import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";

const CustomCalendar = ({ value, onChange, events = [] }) => {
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayEvents = events.filter(
        (event) => event.date.split("T")[0] === date.toISOString().split("T")[0]
      );
      return (
        <ul className="calendar-event-list">
          {dayEvents.map((event, idx) => (
            <li key={idx} className="calendar-event">
              {event.label}
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="calendar-wrapper">
      <Calendar value={value} onChange={onChange} tileContent={tileContent} />
    </div>
  );
};

export default CustomCalendar;
