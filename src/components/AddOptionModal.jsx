import React, { useState } from "react";
import "../styles/Modal.css";

function AddOptionModal({ type, onClose, onAddOption, defaultOptions }) {
  const [tab, setTab] = useState("library");
  const [customLabel, setCustomLabel] = useState("");
  const [customIcon, setCustomIcon] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleAdd = (label, icon) => {
    if (!date || !time) {
      alert("Please select date and time.");
      return;
    }
    onAddOption({ label, icon, date, time });
    onClose();
  };

  const handleCustomAdd = () => {
    if (!customLabel || !customIcon || !date || !time) {
      alert("Please complete all fields.");
      return;
    }
    handleAdd(customLabel, customIcon);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add {type}</h2>
        <div className="tabs">
          <button onClick={() => setTab("library")} className={tab === "library" ? "active" : ""}>
            Library
          </button>
          <button onClick={() => setTab("custom")} className={tab === "custom" ? "active" : ""}>
            Custom
          </button>
        </div>

        {tab === "library" ? (
          <div className="library-options">
            {defaultOptions.map((item, idx) => (
              <button
                key={idx}
                className="option"
                onClick={() => handleAdd(item.label, item.icon)}
              >
                <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="custom-form">
            <input
              type="text"
              placeholder="Label"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
            />
            <input
              type="text"
              placeholder="Emoji/Icon"
              value={customIcon}
              onChange={(e) => setCustomIcon(e.target.value)}
            />
            <button onClick={handleCustomAdd}>Add</button>
          </div>
        )}

        <div className="date-time-picker">
          <label>Date: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
          <label>Time: <input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label>
        </div>

        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
}

export default AddOptionModal;
