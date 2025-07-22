import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Calendar from '../components/Calendar';

const CalendarPage = ({ clients }) => {
  const { clientId } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Find the client whose calendar we want to show
  const client = clients.find(c => c.id === clientId);
  if (!client) {
    return (
      <div className="p-4 text-gray-100">
        <h2 className="text-xl font-bold mb-2">Client not found</h2>
        <Link to="/" className="text-blue-400 hover:underline">Go back home</Link>
      </div>
    );
  }

  // Combine activities and meals into a single events list with type
  const events = useMemo(() => {
    return [
      ...client.activities.map(a => ({ ...a, type: 'activity' })),
      ...client.meals.map(m => ({ ...m, type: 'meal' })),
    ];
  }, [client.activities, client.meals]);

  // Handlers to navigate calendar
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
    <div className="calendar-page p-4">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">
        {client.name}'s Calendar
      </h2>
      <Link to={`/client/${clientId}`} className="text-blue-400 hover:underline mb-4 inline-block">
        &larr; Back to Profile
      </Link>
      <Calendar 
        date={currentDate}
        events={events}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />
    </div>
  );
};

export default CalendarPage;
