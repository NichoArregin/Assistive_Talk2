import React, { useState } from 'react';
import Icon from '../components/Icon';
import '../styles/Diary.css';

const Diary = ({ diaryEntries, onAddEntry }) => {
  const [entryContent, setEntryContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = entryContent.trim();
    if (!content) return;
    onAddEntry(content);
    setEntryContent('');  // Clear input after saving
  };

  // Format relative time similar to MoodTracker
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffSec = Math.floor((now - then) / 1000);
    if (diffSec < 60) return 'just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return then.toLocaleDateString();
  };

  return (
    <div className="diary">
      <h3>
        <Icon name="diary" className="diary-icon" />
        <span>Diary</span>
      </h3>
      <form onSubmit={handleSubmit} className="diary-form">
        <textarea 
          value={entryContent}
          onChange={(e) => setEntryContent(e.target.value)}
          placeholder="Add a new diary entry..."
          className="form-input"
          rows={3}
          aria-label="New diary entry"
        />
        <div className="save-btn-container">
          <button 
            type="submit" 
            className="btn btn-green" 
            disabled={!entryContent.trim()}
          >
            Save Entry
          </button>
        </div>
      </form>
      <div>
        <h4>Recent Entries</h4>
        {diaryEntries.length > 0 ? (
          <div className="diary-entries">
            {diaryEntries.map(entry => (
              <div key={entry.id} className="diary-entry">
                <p className="entry-text">{entry.content}</p>
                <p className="entry-time">{formatRelativeTime(entry.timestamp)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-entries">No diary entries yet.</p>
        )}
      </div>
    </div>
  );
};

export default Diary;
