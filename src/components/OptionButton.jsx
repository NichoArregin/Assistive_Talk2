import React from "react";
import useTextToSpeech from "../hooks/useTextToSpeech";
import "../styles/OptionButton.css"; // Assuming you have a CSS file for styling

const OptionButton = ({ label, icon, date, time }) => {
  const { speak } = useTextToSpeech();

  const handleClick = () => {
    speak(label);
  };

  return (
    <div className="option-button" onClick={handleClick} tabIndex={0}>
      <div className="icon">{icon}</div>
      <div className="label">{label}</div>
      {date && time && (
        <div className="timestamp">
          {new Date(date).toLocaleDateString()} - {time}
        </div>
      )}
    </div>
  );
};

export default OptionButton;
