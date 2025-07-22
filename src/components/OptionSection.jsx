import React from "react";

function OptionSection({ type, client, onAddOption, onDeleteOption }) {
  const options = client.options.filter((o) => o.type === type);

  return (
    <div className="bg-zinc-800 p-4 rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-2">
        {type === "activity" ? "Activities" : "Meals"}
      </h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            {option.label} - {option.date} {option.time}
            <button
              onClick={() => onDeleteOption(client.id, option)}
              className="text-red-400 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OptionSection;
