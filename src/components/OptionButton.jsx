import React from "react";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import Icon from "./Icon";
// Removed: import "../styles/OptionButton.css";

const OptionButton = ({ label, icon, date, time, onDelete }) => {
  const { speak } = useTextToSpeech();

  const handleDeleteClick = (e) => {
    e.stopPropagation();  // prevent triggering the main click
    if (onDelete) onDelete();
  };

  // Format date and time for display
  const formattedDate = date ? new Date(date + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
  const formatTime = (t) => {
    if (!t) return '';
    const [hours, minutes] = t.split(':');
    const d = new Date();
    d.setHours(parseInt(hours, 10));
    d.setMinutes(parseInt(minutes, 10));
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <button
      onClick={() => speak(label)}
      className="group relative flex flex-col items-center justify-center p-4 bg-slate-700 rounded-lg border-2 border-transparent hover:bg-slate-600 hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-200 aspect-square"
      aria-label={label}
    >
      {/* Delete "X" button (shown on hover) */}
      {onDelete && (
        <button
          type="button"
          onClick={handleDeleteClick}
          className="absolute top-1 right-1 p-1 bg-slate-800/50 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white focus:opacity-100 focus:bg-red-500 focus:text-white transition"
          aria-label={`Delete ${label}`}
        >
          <Icon name="close" className="w-4 h-4" />
        </button>
      )}
      {/* Icon */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mb-2 flex items-center justify-center">
        <Icon name={icon} />
      </div>
      {/* Label */}
      <span className="text-center font-semibold text-sm sm:text-base text-gray-200">
        {label}
      </span>
      {/* Date and time (if provided) */}
      {date && (
        <div className="text-center text-xs text-gray-400 mt-1">
          <span>{formattedDate}</span>
          {time && <span className="ml-1 font-mono">{formatTime(time)}</span>}
        </div>
      )}
    </button>
  );
};

export default OptionButton;
