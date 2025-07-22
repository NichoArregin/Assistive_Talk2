import React, { useState } from "react";
import OptionButton from "./OptionButton";
import AddOptionModal from "./AddOptionModal";

function OptionSection({ client, type, onAddOption }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const options = client.options[type] || [];

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (option) => {
    onAddOption(client.id, type, option);
    setIsModalOpen(false);
  };

  return (
    <div className="option-section">
      <div className="option-section-header">
        <h2>{type === "activities" ? "Activities" : "Meals"}</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setIsModalOpen(true)}>+ Add</button>
      </div>

      <div className="option-grid">
        {filteredOptions.map((option, index) => (
          <OptionButton key={index} option={option} />
        ))}
      </div>

      {isModalOpen && (
        <AddOptionModal
          type={type}
          onClose={() => setIsModalOpen(false)}
          onSave={handleAdd}
        />
      )}
    </div>
  );
}

export default OptionSection;
