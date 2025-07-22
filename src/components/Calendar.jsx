import React from 'react';
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import Icon from '../components/Icon';

const Calendar = ({ date, events, onPrevMonth, onNextMonth, onToday }) => {
  const { speak } = useTextToSpeech();

  // Derive month and year from current date
  const month = date.getMonth();
  const year = date.getFullYear();
  const monthName = date.toLocaleString('default', { month: 'long' });

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Determine number of days in month and what day of week the month starts on
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Build calendar grid with blank placeholders and actual days
  const calendarGrid = [];

  // Add blank cells for days before the first day of this month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarGrid.push(<div key={`blank-start-${i}`} className="border border-slate-700 text-gray-300 p-1" />);
  }

  // Add each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const loopDate = new Date(year, month, day);
    // Format date as YYYY-MM-DD for comparison with event dates
    const dateString = loopDate.toISOString().split('T')[0];
    const todaysEvents = events.filter(e => e.date === dateString);
    const isToday = new Date().toDateString() === loopDate.toDateString();

    calendarGrid.push(
      <div 
        key={dateString} 
        className={`border border-slate-700 p-1 text-xs ${isToday ? 'bg-slate-600' : 'bg-slate-800'}`}
      >
        {/* Day number (highlight if today) */}
        <div className={`font-medium mb-1 ${isToday ? 'text-blue-400' : 'text-gray-300'}`}>
          {day}
        </div>
        {/* List events for this day */}
        {todaysEvents.map(event => (
          <button 
            key={event.id} 
            onClick={() => speak(event.label)} 
            title={event.label}
            className={`w-full text-left p-1 rounded-md font-semibold flex items-center gap-1.5 truncate 
              ${event.type === 'activity' ? 'bg-blue-500/20 hover:bg-blue-500/40 text-blue-200' 
                                          : 'bg-orange-500/20 hover:bg-orange-500/40 text-orange-200'} 
              transition-colors`}
          >
            <Icon name={event.icon} className="w-4 h-4" />
            <span className="text-xs">{event.label}</span>
          </button>
        ))}
      </div>
    );
  }

  // Add blank cells to complete the last week grid (if needed)
  const totalCells = firstDayOfMonth + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < remainingCells; i++) {
    calendarGrid.push(<div key={`blank-end-${i}`} className="border border-slate-700 text-gray-300 p-1" />);
  }

  return (
    <div className="calendar">
      {/* Month-Year header and navigation */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-100">
          {monthName} {year}
        </h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onPrevMonth} 
            className="px-3 py-1 bg-slate-700 text-gray-100 rounded hover:bg-slate-600"
            aria-label="Previous month"
          >
            &lt;
          </button>
          <button 
            onClick={onToday} 
            className="px-3 py-1 bg-slate-700 text-gray-100 rounded hover:bg-slate-600"
          >
            Today
          </button>
          <button 
            onClick={onNextMonth} 
            className="px-3 py-1 bg-slate-700 text-gray-100 rounded hover:bg-slate-600"
            aria-label="Next month"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-400 mb-1">
        {weekdays.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarGrid}
      </div>
    </div>
  );
};

export default Calendar;
