import React, { useState } from "react";
import OptionButton from "./OptionButton";
import AddOptionModal from "./AddOptionModal";
import { DEFAULT_ACTIVITIES, DEFAULT_MEALS } from "../data/constants";
import "../styles/OptionSection.css";


function OptionSection({ title, options, onAddOption }) {
  const [showModal, setShowModal] = useState(false);

  const defaultOptions = title === "Activities" ? DEFAULT_ACTIVITIES : DEFAULT_MEALS;

  return (
    <div className="option-section">
      <div className="section-header">
        <h3>{title}</h3>
        <button onClick={() => setShowModal(true)}>Add</button>
      </div>

      <div className="option-grid">
        {options.map((option, idx) => (
          <OptionButton key={idx} label={option.label} icon={option.icon} />
        ))}
      </div>

      {showModal && (
        <AddOptionModal
          type={title.toLowerCase()}
          onClose={() => setShowModal(false)}
          onAddOption={onAddOption}
          defaultOptions={defaultOptions}
        />
      )}
    </div>
  );
}

export default OptionSection;
