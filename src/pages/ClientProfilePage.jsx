import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import OptionSection from '../components/OptionSection';
import ConfirmationModal from '../components/ConfirmationModal';
import MoodTracker from '../components/MoodTracker';
import Diary from '../components/Diary';
import Icon from '../components/Icon';
import { DEFAULT_ACTIVITIES, DEFAULT_MEALS } from '../data/constants';
import '../styles/ClientProfilePage.css';

const ClientProfilePage = ({
  clients,
  onAddActivity,
  onAddMeal,
  onAddMoodEntry,
  onAddDiaryEntry,
  onDeleteClient,
  onDeleteActivity,
  onDeleteMeal
}) => {
  const { clientId } = useParams();
  const { speak } = useTextToSpeech();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const client = clients.find(c => c.id === clientId);
  if (!client) {
    return (
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold mb-4">Client not found</h2>
        <Link to="/" className="text-blue-400 hover:underline">Go back home</Link>
      </div>
    );
  }

  // Wrapper functions to include this client's ID for actions
  const handleOptionClick = (label) => {
    // Speak the option label (text-to-speech) when any activity/meal button is clicked
    speak(label);
  };
  const handleAddClientActivity = (label, icon, date, time) => {
    onAddActivity(client.id, label, icon, date, time);
  };
  const handleAddClientMeal = (label, icon, date, time) => {
    onAddMeal(client.id, label, icon, date, time);
  };
  const handleAddClientMoodEntry = (mood) => {
    onAddMoodEntry(client.id, mood);
  };
  const handleAddClientDiaryEntry = (content) => {
    onAddDiaryEntry(client.id, content);
  };

  const handleConfirmDelete = () => {
    onDeleteClient(client.id);
    setDeleteModalOpen(false);
    navigate('/');
  };
  const handleDeleteClientActivity = (activityId) => {
    onDeleteActivity(client.id, activityId);
  };
  const handleDeleteClientMeal = (mealId) => {
    onDeleteMeal(client.id, mealId);
  };

  return (
    <div className="profile-container">
      {/* Header: profile image, greeting, and action buttons */}
      <div className="profile-header">
        {/* Client image and greeting */}
        <div className="profile-user">
          <img 
            src={client.imageUrl}
            alt={client.name}
            className="profile-img"
          />
          <h2 className="profile-greeting">Hi, {client.name}!</h2>
        </div>
        {/* Profile action buttons */}
        <div className="profile-actions">
          <Link 
            to={`/client/${client.id}/calendar`} 
            className="btn btn-purple" 
            title="View Calendar"
          >
            <Icon name="calendar" className="btn-icon" />
            <span>Calendar</span>
          </Link>
          <Link 
            to="/" 
            className="btn btn-blue" 
            title="Change Profile"
          >
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>Change Profile</span>
          </Link>
          <button 
            type="button" 
            onClick={() => setDeleteModalOpen(true)} 
            className="btn btn-red" 
            aria-label="Delete client profile"
          >
            Delete Profile
          </button>
        </div>
      </div>

      {/* Mood Tracker and Diary sections */}
      <MoodTracker moodHistory={client.moodHistory} onAddMood={handleAddClientMoodEntry} />
      <Diary diaryEntries={client.diaryEntries} onAddEntry={handleAddClientDiaryEntry} />

      {/* Activities and Meals sections */}
      <OptionSection 
        title="What would you like to do today?"
        options={client.activities}
        defaultOptions={DEFAULT_ACTIVITIES}
        onOptionClick={handleOptionClick}
        onAddOption={handleAddClientActivity}
        onDeleteOption={handleDeleteClientActivity}
        searchPlaceholder="Search activities..."
        optionTypeName="Activity"
      />
      <OptionSection 
        title="What would you like to eat?"
        options={client.meals}
        defaultOptions={DEFAULT_MEALS}
        onOptionClick={handleOptionClick}
        onAddOption={handleAddClientMeal}
        onDeleteOption={handleDeleteClientMeal}
        searchPlaceholder="Search meals..."
        optionTypeName="Meal"
      />

      {/* Delete confirmation modal */}
      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Profile"
        message={
          <>
            <p>Are you sure you want to delete <strong>{client.name}'s</strong> profile?</p>
            <p>This action cannot be undone.</p>
          </>
        }
      />
    </div>
  );
};

export default ClientProfilePage;
