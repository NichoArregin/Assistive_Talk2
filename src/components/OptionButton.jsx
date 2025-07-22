// src/components/OptionButton.jsx
import React from "react";
import useTextToSpeech from "../hooks/useTextToSpeech";

function OptionButton({ option }) {
  const speak = useTextToSpeech();

  const handleClick = () => {
    speak(option.label);
  };

  return (
    <div className="option-button" onClick={handleClick}>
      <div className="icon">{option.icon}</div>
      <div className="label">{option.label}</div>
      <div className="datetime">
        {option.date} {option.time}
      </div>
    </div>
  );
}

export default OptionButton;
