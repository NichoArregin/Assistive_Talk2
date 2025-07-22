import React, { useState } from "react";
import "../styles/AddOptionModal.css";

function AddOptionModal({ type, onClose, onAddOption, defaultOptions }) {
  const [activeTab, setActiveTab] = useState("library");
  const [customName, setCustomName] = useState("");

  const handleLibraryClick = (option) => {
    onAddOption(option.label, option.icon);
    onClose();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customName) return;
    onAddOption(customName, "default");
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="tabs">
          <button onClick={() => setActiveTab("library")} className={activeTab === "library" ? "active" : ""}>
            Library
          </button>
          <button onClick={() => setActiveTab("custom")} className={activeTab === "custom" ? "active" : ""}>
            Custom
          </button>
        </div>

        {activeTab === "library" && (
          <div className="library-list">
            {defaultOptions.map((opt, index) => (
              <button key={index} onClick={() => handleLibraryClick(opt)} className="library-option">
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {activeTab === "custom" && (
          <form onSubmit={handleCustomSubmit} className="custom-form">
            <input
              type="text"
              placeholder={`Enter custom ${type}`}
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddOptionModal;
