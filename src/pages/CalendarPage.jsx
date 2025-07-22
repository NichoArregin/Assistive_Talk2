import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Calendar from '../components/Calendar';
import '../styles/CalendarPage.css';

const CalendarPage = ({ clients }) => {
  const { clientId } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());

  const client = clients.find(c => c.id === clientId);
  if (!client) {
    return (
      <div className="calendar-page">
        <h2 className="calendar-title">Client not found</h2>
        <Link to="/" className="back-button">Go back home</Link>
      </div>
    );
  }

  const events = useMemo(() => {
    return [
      ...client.activities.map(a => ({ ...a, type: 'activity' })),
      ...client.meals.map(m => ({ ...m, type: 'meal' })),
    ];
  }, [client.activities, client.meals]);

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  const handleToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <div className="client-info">
          <img src={client.imageUrl} alt={client.name} className="calendar-avatar" />
          <div>
            <h2 className="calendar-title">{client.name}'s Calendar</h2>
            <Link to={`/client/${client.id}`} className="back-button">&larr; Back to Profile</Link>
          </div>
        </div>
      </div>

      <div className="calendar-container">
        <Calendar
          date={currentDate}
          events={events}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
