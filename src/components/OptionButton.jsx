import React from "react";
import Icon from "./Icon";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

function OptionButton({ option }) {
  const speak = useTextToSpeech();

  const handleClick = () => {
    speak(option.label);
  };

  return (
    <div className="option-button" onClick={handleClick}>
      <div className="option-icon">
        <Icon name={option.icon} />
      </div>
      <div className="option-label">{option.label}</div>
      {option.time && (
        <div className="option-time">{option.time}</div>
      )}
    </div>
  );
}

export default OptionButton;
