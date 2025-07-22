import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AddClientPage from "./pages/AddClientPage";
import ClientProfilePage from "./pages/ClientProfilePage";
import CalendarPage from "./pages/CalendarPage";

function App() {
  const [clients, setClients] = useState([]);

  // Load clients from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("assistive-talk-clients");
    if (saved) {
      setClients(JSON.parse(saved));
    }
  }, []);

  // Save clients to localStorage
  useEffect(() => {
    localStorage.setItem("assistive-talk-clients", JSON.stringify(clients));
  }, [clients]);

  const handleAddClient = (client) => {
    setClients([...clients, client]);
  };

  const handleAddMood = (clientId, mood) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId
          ? {
              ...client,
              moods: [{ mood, date: new Date().toISOString() }, ...(client.moods || [])],
            }
          : client
      )
    );
  };

  const handleAddDiary = (clientId, entry) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId
          ? {
              ...client,
              diary: [
                { text: entry, date: new Date().toISOString() },
                ...(client.diary || []),
              ],
            }
          : client
      )
    );
  };

  const handleAddOption = (clientId, type, option) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId
          ? {
              ...client,
              [type]: [...(client[type] || []), option],
            }
          : client
      )
    );
  };

  const todayISO = new Date().toISOString().split("T")[0];
  const todaysReminders = [];

  clients.forEach((client) => {
    ["activities", "meals"].forEach((type) => {
      (client[type] || []).forEach((item) => {
        const itemDate = item.date?.split("T")[0];
        if (itemDate === todayISO) {
          todaysReminders.push({
            label: `${client.name} - ${item.label}`,
            time: item.time || "Time not set",
          });
        }
      });
    });
  });

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage clients={clients} reminders={todaysReminders} />} />
        <Route path="/add" element={<AddClientPage onAddClient={handleAddClient} />} />
        <Route
          path="/profile/:id"
          element={
            <ClientProfilePage
              clients={clients}
              onAddMood={handleAddMood}
              onAddDiary={handleAddDiary}
              onAddOption={handleAddOption}
            />
          }
        />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
