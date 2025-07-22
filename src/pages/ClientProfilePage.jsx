import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ClientProfilePage.css";

const moodOptions = [
  { emoji: "😊", label: "Happy", color: "#34d399" },
  { emoji: "😐", label: "Content", color: "#60a5fa" },
  { emoji: "😢", label: "Sad", color: "#facc15" },
  { emoji: "😠", label: "Upset", color: "#f87171" },
];

function ClientProfile({ clients, updateClientMood, updateClientDiary }) {
  const { clientId } = useParams();
  const client = clients.find((c) => c.id === clientId);
  const navigate = useNavigate();

  const handleMoodClick = (mood) => {
    updateClientMood(clientId, mood.label);
    const audio = new Audio(`/sounds/${mood.label.toLowerCase()}.mp3`);
    audio.play();
  };

  const handleDiaryChange = (e) => {
    updateClientDiary(clientId, e.target.value);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (confirmDelete) {
      navigate("/");
    }
  };

  return (
    <div className="client-profile">
      <div className="profile-header">
        <img src={client.image} alt="Profile" className="profile-picture" />
        <h1>Hi, {client.name}!</h1>
        <div className="profile-buttons">
          <button className="btn calendar-btn" onClick={() => navigate(`/client/${clientId}/calendar`)}>
            📅 Calendar
          </button>
          <button className="btn home-btn" onClick={() => navigate("/")}>
            🏠 Change Profile
          </button>
          <button className="btn delete-btn" onClick={handleDelete}>
            🗑 Delete Profile
          </button>
        </div>
      </div>

      <div className="mood-section">
        <h2>How are you feeling?</h2>
        <div className="mood-grid">
          <div className="mood-options">
            <h3>Log a new mood</h3>
            <div className="mood-buttons">
              {moodOptions.map((mood) => (
                <button
                  key={mood.label}
                  className="mood-btn"
                  style={{ color: mood.color }}
                  onClick={() => handleMoodClick(mood)}
                >
                  <span className="emoji">{mood.emoji}</span>
                  <p>{mood.label}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="recent-moods">
            <h3>Recent moods</h3>
            {client.moods && client.moods.length > 0 ? (
              <ul>
                {client.moods.map((mood, index) => (
                  <li key={index}>{mood}</li>
                ))}
              </ul>
            ) : (
              <p>No moods logged yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="diary-section">
        <h2>📓 Diary</h2>
        <textarea
          placeholder="Add a new diary entry..."
          value={client.diary || ""}
          onChange={handleDiaryChange}
        />
      </div>
    </div>
  );
}

export default ClientProfile;
