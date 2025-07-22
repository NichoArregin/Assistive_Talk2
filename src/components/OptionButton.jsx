import React from "react";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import Icon from "./Icon";
import "../styles/OptionButton.css";

const OptionButton = ({ label, icon, date, time, onClick, onDelete }) => {
  const { speak } = useTextToSpeech();

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  const handleSpeak = () => {
    speak(label);
    if (onClick) onClick();
  };

  // Format date and time for display
  const formattedDate = date ? new Date(date + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
  const formattedTime = time ? (() => {
    const [h, m] = time.split(':'); 
    const d = new Date();
    d.setHours(+h, +m);
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  })() : '';

  return (
    <button 
      className="option-button" 
      onClick={handleSpeak} 
      aria-label={label}
    >
      {onDelete && (
        <button 
          type="button"
          className="delete-button" 
          onClick={handleDeleteClick} 
          aria-label={`Delete ${label}`}
        >
          <Icon name="close" className="delete-icon" />
        </button>
      )}
      <div className="option-icon">
        <Icon name={icon} />
      </div>
      <span className="option-label">{label}</span>
      {date && time && (
        <div className="option-timestamp">
          <span>{formattedDate}</span>
          <span className="timestamp-time">{formattedTime}</span>
        </div>
      )}
    </button>
  );
};

export default OptionButton;
