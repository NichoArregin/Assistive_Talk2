import React from "react";
import { useParams } from "react-router-dom";
import MoodTracker from "../components/MoodTracker";
import Diary from "../components/Diary";
import OptionSection from "../components/OptionSection";
import ClientCalendar from "../components/ClientCalendar";
import "../styles/ClientProfilePage.css";

function ClientProfilePage({ clients, onUpdateClient, onAddOption }) {
  const { id } = useParams();
  const client = clients.find((c) => c.id === id);

  if (!client) return <p>Client not found.</p>;

  const handleAddMood = (mood) => {
    const newMood = { mood, date: new Date().toISOString() };
    const updatedClient = {
      ...client,
      moodHistory: [newMood, ...client.moodHistory],
    };
    onUpdateClient(updatedClient);
  };

  const handleAddDiaryEntry = (entry) => {
    const newEntry = { entry, date: new Date().toISOString() };
    const updatedClient = {
      ...client,
      diaryEntries: [newEntry, ...client.diaryEntries],
    };
    onUpdateClient(updatedClient);
  };

  const handleAddOption = (optionType, optionData) => {
    const updatedClient = {
      ...client,
      options: {
        ...client.options,
        [optionType]: [...client.options[optionType], optionData],
      },
    };
    onUpdateClient(updatedClient);
  };

  const { moodHistory, diaryEntries, options } = client;
  const { activities, meals } = options;

  const scheduledOptions = [...activities, ...meals];

  return (
    <div className="client-profile-page">
      <h2 className="client-name">{client.name}</h2>
      <img src={client.image} alt={client.name} className="client-image" />

      <MoodTracker moodHistory={moodHistory} onAddMood={handleAddMood} />
      <Diary diaryEntries={diaryEntries} onAddEntry={handleAddDiaryEntry} />

      <OptionSection
        title="Activities"
        options={activities}
        onAddOption={(data) => handleAddOption("activities", data)}
      />

      <OptionSection
        title="Meals"
        options={meals}
        onAddOption={(data) => handleAddOption("meals", data)}
      />

      <div className="profile-calendar">
        <h3>{client.name}'s Monthly Calendar</h3>
        <ClientCalendar scheduledOptions={scheduledOptions} />
      </div>
    </div>
  );
}

export default ClientProfilePage;
