import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CalendarPage.css';

const CalendarPage = ({ clients }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = clients.find((c) => c.id === id);

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <button className="back-button" onClick={() => navigate(-1)}>←</button>
        <h2 className="calendar-title">{client.name}'s Calendar</h2>
      </div>
      <img className="calendar-avatar" src={client.image} alt={client.name} />
      <div className="calendar-grid">
        {Object.entries(client.calendar || {}).map(([date, entry]) => (
          <div key={date} className="calendar-entry">
            <div className="calendar-date">{date}</div>
            <div className="calendar-text">{entry}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
