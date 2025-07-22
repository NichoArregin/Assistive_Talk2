import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MoodTracker from '../components/MoodTracker';
import Diary from '../components/Diary';
import OptionSection from '../components/OptionSection';
import ConfirmationModal from '../components/ConfirmationModal';
import { DEFAULT_ACTIVITIES, DEFAULT_MEALS } from '../data/constants';
import '../styles/ClientProfilePage.css';

function ClientProfilePage({
  clients,
  onAddActivity,
  onAddMeal,
  onAddMoodEntry,
  onAddDiaryEntry,
  onDeleteClient,
  onDeleteActivity,
  onDeleteMeal
}) {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Find the client by ID from the clients list
  const client = clients.find((c) => c.id === clientId);

  if (!client) {
    return (
      <div className="text-center">
        <h2>Client not found</h2>
        <Link to="/">Go back home</Link>
      </div>
    );
  }

  // Handler for confirming profile deletion
  const confirmDeleteHandler = () => {
    onDeleteClient(clientId);
    setDeleteModalOpen(false);
    navigate('/');
  };

  return (
    <div className="client-profile">
      {/* Profile header section */}
      <div className="profile-header">
        <img src={client.imageUrl} alt={client.name} className="profile-picture" />
        <h1>Hi, {client.name}!</h1>
        <div className="profile-buttons">
          <button
            className="btn calendar-btn"
            onClick={() => navigate(`/client/${clientId}/calendar`)}
            title="View Calendar"
          >
            📅 Calendar
          </button>
          <button
            className="btn home-btn"
            onClick={() => navigate('/')}
          >
            🏠 Change Profile
          </button>
          <button
            className="btn delete-btn"
            onClick={() => setDeleteModalOpen(true)}
            aria-label="Delete Profile"
          >
            🗑 Delete Profile
          </button>
        </div>
      </div>

      {/* Mood tracker section */}
      <MoodTracker
        moodHistory={client.moodHistory}
        onAddMood={(mood) => onAddMoodEntry(clientId, mood)}
      />

      {/* Diary section */}
      <Diary
        diaryEntries={client.diaryEntries}
        onAddEntry={(content) => onAddDiaryEntry(clientId, content)}
      />

      {/* Activities option section */}
      <OptionSection
        title="What would you like to do today?"
        options={client.activities}
        defaultOptions={DEFAULT_ACTIVITIES}
        onAddOption={(label, icon, date, time) => onAddActivity(clientId, label, icon, date, time)}
        onDeleteOption={(activityId) => onDeleteActivity(clientId, activityId)}
        searchPlaceholder="Search activities..."
        optionTypeName="Activity"
      />

      {/* Meals option section */}
      <OptionSection
        title="What would you like to eat?"
        options={client.meals}
        defaultOptions={DEFAULT_MEALS}
        onAddOption={(label, icon, date, time) => onAddMeal(clientId, label, icon, date, time)}
        onDeleteOption={(mealId) => onDeleteMeal(clientId, mealId)}
        searchPlaceholder="Search meals..."
        optionTypeName="Meal"
      />

      {/* Delete confirmation modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteHandler}
        title="Delete Profile"
        message={
          <>
            Are you sure you want to delete <strong>{client.name}'s</strong> profile?
            <br />
            This action cannot be undone.
          </>
        }
      />
    </div>
  );
}

export default ClientProfilePage;
