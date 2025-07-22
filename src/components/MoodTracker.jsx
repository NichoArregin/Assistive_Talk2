import React from "react";

function MoodTracker({ moods, onAddMood }) {
  return (
    <div className="bg-zinc-800 p-4 rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-2">Mood Tracker</h2>
      <div className="flex gap-2">
        <button onClick={() => onAddMood("😊")}>😊</button>
        <button onClick={() => onAddMood("😐")}>😐</button>
        <button onClick={() => onAddMood("😢")}>😢</button>
      </div>
      <ul className="mt-2">
        {moods.map((mood, index) => (
          <li key={index}>{mood}</li>
        ))}
      </ul>
    </div>
  );
}

export default MoodTracker;
