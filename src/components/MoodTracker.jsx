import React from "react";

const moods = [
  { label: "😊", description: "Happy" },
  { label: "😐", description: "Neutral" },
  { label: "😔", description: "Sad" },
  { label: "😠", description: "Angry" },
  { label: "😴", description: "Tired" },
];

function MoodTracker({ client, onAddMood }) {
  const handleClick = (mood) => {
    onAddMood(client.id, mood);
  };

  return (
    <div className="mood-section">
      <h2>Mood Tracker</h2>
      <div className="mood-buttons">
        {moods.map((m, index) => (
          <button
            key={index}
            title={m.description}
            className="mood-btn"
            onClick={() => handleClick(m.label)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="mood-history">
        <h4>Recent Moods:</h4>
        <ul>
          {client.moods
            .slice()
            .reverse()
            .map((entry, i) => (
              <li key={i}>
                <span className="mood-emoji">{entry.mood}</span>
                <span className="mood-time">{entry.time}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default MoodTracker;
