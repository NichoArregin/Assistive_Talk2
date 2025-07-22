import React, { useState } from 'react';

const Diary = ({ diaryEntries, onAddEntry }) => {
  const [entryContent, setEntryContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = entryContent.trim();
    if (!content) return;
    onAddEntry(content);
    setEntryContent('');  // Clear input after adding
  };

  return (
    <div className="diary">
      <h3 className="text-lg font-semibold text-gray-100 mb-2">Diary</h3>

      {/* List of diary entries */}
      {diaryEntries.length > 0 ? (
        <ul className="space-y-3 mb-3">
          {diaryEntries.map(entry => (
            <li key={entry.id} className="bg-slate-700 p-3 rounded-lg">
              <div className="text-sm text-gray-400">
                {new Date(entry.timestamp).toLocaleString()}
              </div>
              <div className="text-gray-100">{entry.content}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 mb-3">No diary entries yet.</p>
      )}

      {/* Form to add a new diary entry */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={entryContent}
          onChange={e => setEntryContent(e.target.value)}
          placeholder="Write a new entry..." 
          className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100" 
        />
      </form>
    </div>
  );
};

export default Diary;
