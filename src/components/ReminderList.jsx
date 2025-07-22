import React from "react";
import "../styles/ReminderList.css";

const ReminderList = ({ reminders }) => {
  if (!reminders || reminders.length === 0) {
    return <div className="reminders-empty">No reminders for today.</div>;
  }

  return (
    <div className="reminders-list">
      <h3>Today's Reminders:</h3>
      <ul>
        {reminders.map((r, i) => (
          <li key={i}>
            {r.time} — {r.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderList;
