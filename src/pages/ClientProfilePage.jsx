import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MoodTracker from "../components/MoodTracker";
import Diary from "../components/Diary";
import OptionSection from "../components/OptionSection";
import Icon from "../components/Icon";

function ClientProfilePage({
  clients,
  onDeleteClient,
  onAddMood,
  onAddDiaryEntry,
  setClients,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = clients.find((c) => c.id === id);

  if (!client) return <p>Client not found.</p>;

  return (
    <div className="page">
      <div className="client-header">
        <img src={client.image} alt={client.name} className="client-avatar" />
        <h1>{client.name}</h1>
        <button
          className="delete-button"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this client?")) {
              onDeleteClient(client.id);
              navigate("/");
            }
          }}
        >
          <Icon name="trash" />
        </button>
      </div>

      <MoodTracker client={client} onAddMood={onAddMood} />
      <Diary client={client} onAddDiaryEntry={onAddDiaryEntry} />

      <OptionSection
        type="activities"
        client={client}
        clients={clients}
        setClients={setClients}
      />
      <OptionSection
        type="meals"
        client={client}
        clients={clients}
        setClients={setClients}
      />
    </div>
  );
}

export default ClientProfilePage;
