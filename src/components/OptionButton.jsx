import React from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import Icon from './Icon';
import '../styles/OptionButton.css';

const OptionButton = ({ label, icon, date, time, onDelete }) => {
  const { speak } = useTextToSpeech();

  const handleDeleteClick = (e) => {
    e.stopPropagation();  // Prevent main button click when deleting
    if (onDelete) onDelete();
  };

  // Format the time to 12-hour format (if provided)
  const formatTime = (t) => {
    if (!t) return '';
    const [hours, minutes] = t.split(':');
    const d = new Date();
    d.setHours(parseInt(hours, 10));
    d.setMinutes(parseInt(minutes, 10));
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  // Format the date to a short readable format (e.g., "Jan 5, 2025")
  const formattedDate = date ? new Date(date + 'T00:00:00').toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }) : '';

  return (
    <button 
      className="option-button" 
      onClick={() => speak(label)} 
      aria-label={label}
    >
      {onDelete && (
        <button 
          type="button" 
          className="delete-btn" 
          onClick={handleDeleteClick} 
          aria-label={`Delete ${label}`}
        >
          <Icon name="close" className="icon-xs" />
        </button>
      )}
      <div className="option-icon">
        <Icon name={icon} />
      </div>
      <span className="option-label">{label}</span>
      {date && (
        <div className="option-date">
          <span>{formattedDate}</span>
          {time && <span className="time">{formatTime(time)}</span>}
        </div>
      )}
    </button>
  );
};

export default OptionButton;
