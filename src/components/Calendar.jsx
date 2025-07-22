import React from 'react';
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import Icon from './Icon';
import "../styles/Calendar.css";

const Calendar = ({ date, events, onPrevMonth, onNextMonth, onToday }) => {
  const { speak } = useTextToSpeech();

  const month = date.getMonth();
  const year = date.getFullYear();
  const monthName = date.toLocaleString('default', { month: 'long' });
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Determine days in month and leading/trailing blank cells
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const totalCells = firstDayOfMonth + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;

  // Build calendar cells
  const cells = [];
  // Blank cells before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<div key={`blank-start-${i}`} className="calendar-cell empty-cell"></div>);
  }
  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    const todaysEvents = events.filter(e => e.date === dateStr);
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
    cells.push(
      <div key={dateStr} className={`calendar-cell day-cell ${isToday ? 'today-cell' : ''}`}>
        <time className={`day-number ${isToday ? 'today' : ''}`}>{day}</time>
        <div className="events-list">
          {todaysEvents.map(event => (
            <button 
              key={event.id}
              onClick={() => speak(event.label)}
              title={event.label}
              className={`event-button ${event.type}`}
            >
              <Icon name={event.icon} className="event-icon" />
              <span className="event-label">{event.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  // Blank cells after month ends
  for (let j = 0; j < remainingCells; j++) {
    cells.push(<div key={`blank-end-${j}`} className="calendar-cell empty-cell"></div>);
  }

  return (
    <div className="calendar-section card-section">
      {/* Calendar header with month navigation */}
      <div className="calendar-header">
        <h3>{monthName} {year}</h3>
        <div className="calendar-nav">
          <button onClick={onPrevMonth} aria-label="Previous month" className="btn btn-gray">&lt;</button>
          <button onClick={onToday} className="btn btn-gray">Today</button>
          <button onClick={onNextMonth} aria-label="Next month" className="btn btn-gray">&gt;</button>
        </div>
      </div>
      {/* Weekday labels */}
      <div className="weekday-row">
        {weekdays.map(day => (
          <div key={day} className="weekday-cell">{day}</div>
        ))}
      </div>
      {/* Calendar grid */}
      <div className="calendar-grid">
        {cells}
      </div>
    </div>
  );
};

export default Calendar;
