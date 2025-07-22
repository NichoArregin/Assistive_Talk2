import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddClientPage from "./pages/AddClientPage";
import ClientProfilePage from "./pages/ClientProfilePage";
import CalendarPage from "./pages/CalendarPage";
import Header from "./components/Header";

function App() {
  const [clients, setClients] = useState(() => {
    const stored = localStorage.getItem("assistive-talk-clients");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("assistive-talk-clients", JSON.stringify(clients));
  }, [clients]);

  const handleAddClient = (newClient) => {
    setClients([...clients, newClient]);
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter((c) => c.id !== clientId));
  };

  const handleAddMood = (clientId, mood) => {
    const updatedClients = clients.map((client) => {
      if (client.id === clientId) {
        return {
          ...client,
          moods: [
            ...client.moods,
            {
              mood: mood,
              date: new Date().toLocaleDateString(),
            },
          ],
        };
      }
      return client;
    });
    setClients(updatedClients);
  };

  const handleAddDiaryEntry = (clientId, entryText) => {
    const updatedClients = clients.map((client) => {
      if (client.id === clientId) {
        return {
          ...client,
          diaryEntries: [
            ...client.diaryEntries,
            {
              text: entryText,
              date: new Date().toLocaleDateString(),
            },
          ],
        };
      }
      return client;
    });
    setClients(updatedClients);
  };

  return (
    <Router>
      <Header clients={clients} />
      <Routes>
        <Route path="/" element={<HomePage clients={clients} />} />
        <Route
          path="/add"
          element={<AddClientPage onAddClient={handleAddClient} />}
        />
        <Route
          path="/client/:id"
          element={
            <ClientProfilePage
              clients={clients}
              onDeleteClient={handleDeleteClient}
              onAddMood={handleAddMood}
              onAddDiaryEntry={handleAddDiaryEntry}
              setClients={setClients}
            />
          }
        />
        <Route
          path="/calendar/:id"
          element={<CalendarPage clients={clients} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
