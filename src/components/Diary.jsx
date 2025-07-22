import React, { useState } from 'react';
import "../styles/Diary.css";

const Diary = ({ diaryEntries, onAddDiaryEntry }) => {
  const [entryContent, setEntryContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = entryContent.trim();
    if (!content) return;
    onAddDiaryEntry(content);
    setEntryContent('');  // Clear input after adding
  };

  // Format relative time similar to mood tracker
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffSec = Math.floor((now - then) / 1000);
    if (diffSec < 60) return 'just now';
    if (diffSec < 3600) return `${Math.floor(diffSec/60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec/3600)}h ago`;
    return then.toLocaleDateString();
  };

  return (
    <div className="diary card-section">
      <h3>
        <svg xmlns="http://www.w3.org/2000/svg" className="diary-icon" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 2a2 2 0 00-2 2v13a1 1 0 102 0V4h4v13a1 1 0 102 0V4a2 2 0 00-2-2H8z" />
        </svg>
        Diary
      </h3>
      <form onSubmit={handleSubmit} className="diary-form">
        <textarea
          value={entryContent}
          onChange={(e) => setEntryContent(e.target.value)}
          placeholder="Add a new diary entry..."
          className="form-input diary-text"
          rows="3"
          aria-label="New diary entry"
        />
        <div className="save-entry">
          <button type="submit" className="btn btn-green" disabled={!entryContent.trim()}>
            Save Entry
          </button>
        </div>
      </form>
      <div className="diary-entries">
        <h4>Recent Entries</h4>
        {diaryEntries.length > 0 ? (
          <div className="entries-list">
            {diaryEntries.map(entry => (
              <div key={entry.id} className="entry-item">
                <p className="entry-content">{entry.content}</p>
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
