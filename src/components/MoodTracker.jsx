import React from 'react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import Icon from '../components/Icon';
import '../styles/MoodTracker.css';

const MoodTracker = ({ moodHistory, onAddMood }) => {
  const { speak } = useTextToSpeech();
  const moods = ['happy', 'content', 'sad', 'upset'];

  // Format relative time (e.g., "5m ago", "2h ago", or date)
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffSec = Math.floor((now - then) / 1000);
    if (diffSec < 60) return 'just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return then.toLocaleDateString();
  };

  const latestMood = moodHistory.length > 0 ? moodHistory[0] : null;
  const olderMoods = moodHistory.slice(1);

  return (
    <div className="mood-tracker">
      <h3>How are you feeling?</h3>
      <div className="mood-grid">
        {/* Mood input section */}
        <div className="mood-input-section">
          <p>Log a new mood</p>
          <div className="mood-options">
            {moods.map(mood => (
              <button 
                key={mood} 
                className="mood-button" 
                aria-label={mood} 
                onClick={() => {
                  onAddMood(mood);
                  speak(mood.charAt(0).toUpperCase() + mood.slice(1));
                }}
              >
                <div className={`mood-icon-wrap mood-${mood}-icon`}>
                  <Icon name={`mood${mood.charAt(0).toUpperCase() + mood.slice(1)}`} />
                </div>
                <span className="mood-label">
                  {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mood history section */}
        <div className="mood-history-section">
          <h4>Recent moods</h4>
          {latestMood ? (
            <div className="latest-mood">
              <div className={`mood-icon-small mood-${latestMood.mood}-icon`}>
                <Icon name={`mood${latestMood.mood.charAt(0).toUpperCase() + latestMood.mood.slice(1)}`} />
              </div>
              <div>
                <p className="mood-name">
                  {latestMood.mood.charAt(0).toUpperCase() + latestMood.mood.slice(1)}
                </p>
                <p className="mood-time">
                  Latest mood, logged {formatRelativeTime(latestMood.timestamp)}
                </p>
              </div>
            </div>
          ) : (
            <p className="no-moods">No moods logged yet.</p>
          )}
          {olderMoods.length > 0 && (
            <ul className="mood-history-list">
              {olderMoods.map(entry => (
                <li key={entry.id}>
                  <div className={`mood-icon-tiny mood-${entry.mood}-icon`}>
                    <Icon name={`mood${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}`} />
                  </div>
                  <span className="history-mood-label">
                    {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                  </span>
                  <span className="time">{formatRelativeTime(entry.timestamp)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
