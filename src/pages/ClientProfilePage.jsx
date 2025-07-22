import React from 'react';
import { useParams } from 'react-router-dom';
import MoodTracker from '../components/MoodTracker';
import Diary from '../components/Diary';
import OptionSection from '../components/OptionSection';

function ClientProfilePage({
  clients,
  onAddMood,
  onAddDiaryEntry,
  onAddOption,
  onDeleteOption
}) {
  const { id } = useParams();
  const client = clients.find((c) => c.id === id);

  if (!client) {
    return <p className="text-white p-4">Client not found</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white mb-4">{client.name}</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <MoodTracker
          moods={client.moods}
          onAddMood={(mood) => onAddMood(client.id, mood)}
        />
        <Diary
          entries={client.diaryEntries}
          onAddDiaryEntry={(entry) => onAddDiaryEntry(client.id, entry)}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <OptionSection
          type="activity"
          client={client}
          onAddOption={onAddOption}
          onDeleteOption={onDeleteOption}
        />
        <OptionSection
          type="meal"
          client={client}
          onAddOption={onAddOption}
          onDeleteOption={onDeleteOption}
        />
      </div>
    </div>
  );
}

export default ClientProfilePage;
