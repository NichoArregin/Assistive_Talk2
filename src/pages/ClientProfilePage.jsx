import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import OptionSection from '../components/OptionSection';
import ConfirmationModal from '../components/ConfirmationModal';
import MoodTracker from '../components/MoodTracker';
import Diary from '../components/Diary';
import Icon from '../components/Icon';
import { DEFAULT_ACTIVITIES, DEFAULT_MEALS } from '../constants';

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
      <div className="p-4 text-center text-gray-400">
        <h2 className="text-xl font-semibold mb-4">Client not found</h2>
        <Link to="/" className="text-blue-500 hover:underline">Go back home</Link>
      </div>
    );
  }

  // When an option (activity/meal) is clicked, speak its label
  const handleOptionClick = (label) => {
    speak(label);
  };

  // Wrap handlers to include this client's id
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

  const confirmDeleteHandler = () => {
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
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Hi, {client.name}!</h2>
      <div className="flex flex-wrap items-center gap-3">
        <Link 
          to={`/calendar/${client.id}`} 
          className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
        >
          Calendar
        </Link>
        <button 
          type="button" 
          className="px-3 py-1 bg-gray-600 text-white text-sm font-medium rounded cursor-not-allowed"
          title="Change Profile (not implemented)"
          disabled
        >
          Change Profile
        </button>
        <button 
          type="button" 
          onClick={() => setDeleteModalOpen(true)} 
          className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700"
        >
          Delete Profile
        </button>
      </div>

      {/* Activities and Meals sections */}
      <OptionSection 
        title="Activities"
        options={client.activities}
        defaultOptions={DEFAULT_ACTIVITIES}
        onOptionClick={handleOptionClick}
        onAddOption={handleAddClientActivity}
        onDeleteOption={handleDeleteClientActivity}
        searchPlaceholder="Search activities"
        optionTypeName="Activity"
      />
      <OptionSection 
        title="Meals"
        options={client.meals}
        defaultOptions={DEFAULT_MEALS}
        onOptionClick={handleOptionClick}
        onAddOption={handleAddClientMeal}
        onDeleteOption={handleDeleteClientMeal}
        searchPlaceholder="Search meals"
        optionTypeName="Meal"
      />

      {/* Mood tracker and diary sections */}
      <MoodTracker moodHistory={client.moodHistory} onAddMood={handleAddClientMoodEntry} />
      <Diary diaryEntries={client.diaryEntries} onAddDiaryEntry={handleAddClientDiaryEntry} />

      {/* Delete confirmation modal */}
      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteHandler}
        title="Delete Profile"
        message={
          <>
            <p>Are you sure you want to delete {client.name}'s profile?</p>
            <p>This action cannot be undone.</p>
          </>
        }
      />
    </div>
  );
};

export default ClientProfilePage;
