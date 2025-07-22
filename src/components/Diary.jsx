import React, { useState } from "react";

function Diary({ entries, onAddDiaryEntry }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onAddDiaryEntry(text);
    setText("");
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-2">Diary</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded text-black"
          placeholder="Write an entry..."
        />
        <button type="submit" className="mt-2 bg-blue-500 px-4 py-1 rounded">
          Save
        </button>
      </form>
      <ul className="mt-2">
        {entries.map((entry, index) => (
          <li key={index} className="text-sm">{entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default Diary;
