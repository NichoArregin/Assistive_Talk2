import React from 'react';
import Icon from './Icon';
import "../styles/MoodTracker.css";

const MoodTracker = ({ moodHistory, onAddMood }) => {
  const moodOptions = ['happy', 'content', 'sad', 'upset'];

  // Helper to format relative time (e.g., "5m ago", "just now", or date if older)
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffSec = Math.floor((now - then) / 1000);
    if (diffSec < 60) return 'just now';
    if (diffSec < 3600) return `${Math.floor(diffSec/60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec/3600)}h ago`;
    return then.toLocaleDateString();
  };

  const latestMood = moodHistory.length > 0 ? moodHistory[0] : null;
  const olderMoods = moodHistory.slice(1);

  return (
    <div className="mood-tracker card-section">
      <h3>How are you feeling?</h3>
      <div className="mood-tracker-grid">
        {/* Mood input (emoji buttons) */}
        <div className="mood-input">
          <p>Log a new mood:</p>
          <div className="mood-options">
            {moodOptions.map(mood => (
              <button 
                key={mood}
                onClick={() => onAddMood(mood)}
                className="mood-btn"
                aria-label={mood.charAt(0).toUpperCase() + mood.slice(1)}
              >
                <Icon name={`mood${mood.charAt(0).toUpperCase() + mood.slice(1)}`} className="mood-icon" />
                <span className="mood-label">{mood.charAt(0).toUpperCase() + mood.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Mood history display */}
        <div className="mood-history">
          <h4>Recent moods</h4>
          {latestMood ? (
            <div>
              {/* Latest mood highlighted card */}
              <div className="latest-mood">
                <Icon 
                  name={`mood${latestMood.mood.charAt(0).toUpperCase() + latestMood.mood.slice(1)}`} 
                  className="latest-mood-icon" 
                />
                <div>
                  <p className="latest-mood-label">
                    {latestMood.mood.charAt(0).toUpperCase() + latestMood.mood.slice(1)}
                  </p>
                  <p className="latest-mood-time">
                    Latest mood, logged {formatRelativeTime(latestMood.timestamp)}
                  </p>
                </div>
              </div>
              {/* Older mood entries list */}
              <ul className="mood-list">
                {olderMoods.map(entry => (
                  <li key={entry.id} className="past-mood">
                    <Icon 
                      name={`mood${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}`} 
                      className="past-mood-icon" 
                    />
                    <span className="past-mood-label">
                      {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                    </span>
                    <span className="past-mood-time">{formatRelativeTime(entry.timestamp)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-moods">No moods logged yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
