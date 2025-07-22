import React, { useState } from "react";
import "./Diary.css";
function Diary({ client, onAddDiaryEntry }) {
  const [entryText, setEntryText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entryText.trim()) return;

    onAddDiaryEntry(client.id, entryText);
    setEntryText("");
  };

  return (
    <div className="diary-section">
      <h2>Diary</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          placeholder="Write today's note..."
          rows={3}
        />
        <button type="submit">Add Entry</button>
      </form>

      <div className="diary-entries">
        {client.diaryEntries
          .slice()
          .reverse()
          .map((entry, index) => (
            <div className="diary-entry" key={index}>
              <p className="diary-date">{entry.date}</p>
              <p>{entry.text}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Diary;
