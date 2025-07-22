import React from 'react';
import Icon from '../components/Icon';

const MoodTracker = ({ moodHistory, onAddMood }) => {
  // Helper to capitalize mood strings (e.g. "happy" -> "Happy")
  const capMood = mood => mood.charAt(0).toUpperCase() + mood.slice(1);

  // All possible mood options to select
  const moodOptions = ['happy', 'content', 'sad', 'upset'];

  return (
    <div className="mood-tracker">
      <h3 className="text-lg font-semibold text-gray-100 mb-2">Mood Tracker</h3>

      {/* Display recent mood history (last few entries) */}
      {moodHistory.length > 0 ? (
        <div className="flex items-center gap-2 mb-3">
          {moodHistory.map(entry => (
            <Icon 
              key={entry.id} 
              name={`mood${capMood(entry.mood)}`} 
              className="w-6 h-6 text-gray-200" 
              title={`${entry.mood} – ${new Date(entry.timestamp).toLocaleString()}`} 
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mb-3">No mood entries yet.</p>
      )}

      {/* Mood selection buttons */}
      <div className="flex items-center gap-4">
        <span className="text-gray-300">How are you feeling?</span>
        {moodOptions.map(mood => (
          <button 
            key={mood} 
            onClick={() => onAddMood(mood)} 
            className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            aria-label={`Select mood ${mood}`}
          >
            <Icon name={`mood${capMood(mood)}`} className="w-8 h-8" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;
