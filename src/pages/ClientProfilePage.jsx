import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MoodTracker from "../components/MoodTracker";
import Diary from "../components/Diary";
import OptionSection from "../components/OptionSection";
import Reminder from "../components/ReminderList";
import "../styles/ClientProfilePage.css";

function ClientPage({ clients, onUpdateClient }) {
  const { id } = useParams();
  const client = clients.find((c) => c.id === id);
  const [selectedMood, setSelectedMood] = useState(null);

  const moodOptions = [
    { mood: "Happy", emoji: "😊", color: "green" },
    { mood: "Content", emoji: "😐", color: "blue" },
    { mood: "Sad", emoji: "😭", color: "orange" },
    { mood: "Upset", emoji: "😠", color: "red" },
  ];

  const handleMoodClick = (mood) => {
    const newMood = { mood, date: new Date().toISOString() };
    const updatedClient = {
      ...client,
      moods: [...(client.moods || []), newMood],
    };
    onUpdateClient(updatedClient);
    setSelectedMood(mood);
    const sound = new Audio("/sounds/click.mp3");
    sound.play();
  };

  const handleDiaryChange = (newEntry) => {
    const updatedClient = {
      ...client,
      diary: [...(client.diary || []), newEntry],
    };
    onUpdateClient(updatedClient);
  };

  const handleOptionUpdate = (type, newOptions) => {
    const updatedClient = {
      ...client,
      [type]: newOptions,
    };
    onUpdateClient(updatedClient);
  };

  if (!client) return <div>Client not found</div>;

  return (
    <div className="client-container">
      <div className="client-header">
        <img
          src={client.image}
          alt="Profile"
          className="client-profile-image" />
        <h2>Hi, {client.name}!</h2>
        <div className="client-buttons">
          <Link to={`/client/${client.id}/calendar`}>
            <button className="btn calendar-btn">📅 Calendar</button>
          </Link>
          <Link to={`/edit/${client.id}`}>
            <button className="btn edit-btn">🏠 Change Profile</button>
          </Link>
          <Link to="/">
            <button className="btn delete-btn">🗑 Delete Profile</button>
          </Link>
        </div>
      </div>

      <div className="mood-section">
        <div className="mood-log">
          <h3>How are you feeling?</h3>
          <p>Log a new mood</p>
          <div className="mood-buttons">
            {moodOptions.map((option) => (
              <MoodButton
                key={option.mood}
                mood={option.mood}
                emoji={option.emoji}
                color={option.color}
                onClick={handleMoodClick} />
            ))}
          </div>
        </div>
        <div className="mood-log">
          <h3>Recent moods</h3>
          {client.moods?.length ? (
            <ul>
              {client.moods
                .slice(-5)
                .reverse()
                .map((entry, index) => (
                  <li key={index}>
                    {entry.mood} - {new Date(entry.date).toLocaleString()}
                  </li>
                ))}
            </ul>
          ) : (
            <p>No moods logged yet.</p>
          )}
        </div>
      </div>

      <DiaryEntry diary={client.diary || []} onSave={handleDiaryChange} />

      <OptionSection
        title="What would you like to do today?"
        type="activities"
        options={client.activities || []}
        onUpdate={(newOptions) => handleOptionUpdate("activities", newOptions)}
        clientId={client.id} />

      <OptionSection
        title="What would you like to eat?"
        type="foods"
        options={client.foods || []}
        onUpdate={(newOptions) => handleOptionUpdate("foods", newOptions)}
        clientId={client.id} />

      <Reminder client={client} />
    </div>
  );
}

export default ClientPage;
