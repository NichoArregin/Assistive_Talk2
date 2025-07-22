import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClientProfilePage from './pages/ClientProfilePage';
import CalendarPage from './pages/CalendarPage';
import AddClientPage from './pages/AddClientPage';
import Header from './components/Header';

const CLIENTS_STORAGE_KEY = 'assistive-talk-clients';
const getInitialState = (key, defaultValue) => {
  try {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : defaultValue;
  } catch {
    return defaultValue;
  }
};

function App() {
  const [clients, setClients] = useState(() => getInitialState(CLIENTS_STORAGE_KEY, []));
  useEffect(() => {
    try {
      localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
    } catch {}
  }, [clients]);

  // Handler functions (add/delete clients, activities, meals, moods, diary)
  const handleAddClient = (name, imageUrl) => {
    const newClient = {
      id: Date.now().toString(),
      name,
      imageUrl,
      activities: [],
      meals: [],
      moodHistory: [],
      diaryEntries: []
    };
    setClients(prev => [...prev, newClient]);
  };
  const handleDeleteClient = (clientId) => {
    setClients(prev => prev.filter(client => client.id !== clientId));
  };
  const handleAddActivity = (clientId, label, icon, date, time) => {
    const newAct = { id: `act_${Date.now()}`, label, icon, date, time };
    setClients(prev => prev.map(c => 
      c.id === clientId ? { ...c, activities: [...c.activities, newAct] } : c
    ));
  };
  const handleDeleteActivity = (clientId, actId) => {
    setClients(prev => prev.map(c => 
      c.id === clientId ? { ...c, activities: c.activities.filter(a => a.id !== actId) } : c
    ));
  };
  const handleAddMeal = (clientId, label, icon, date, time) => {
    const newMeal = { id: `meal_${Date.now()}`, label, icon, date, time };
    setClients(prev => prev.map(c => 
      c.id === clientId ? { ...c, meals: [...c.meals, newMeal] } : c
    ));
  };
  const handleDeleteMeal = (clientId, mealId) => {
    setClients(prev => prev.map(c => 
      c.id === clientId ? { ...c, meals: c.meals.filter(m => m.id !== mealId) } : c
    ));
  };
  const handleAddMoodEntry = (clientId, mood) => {
    const newMood = { id: `mood_${Date.now()}`, mood, timestamp: new Date().toISOString() };
    setClients(prev => prev.map(c => 
      c.id === clientId ? { ...c, moodHistory: [newMood, ...c.moodHistory].slice(0, 5) } : c
    ));
  };
  const handleAddDiaryEntry = (clientId, content) => {
    const newEntry = { id: `diary_${Date.now()}`, content, timestamp: new Date().toISOString() };
    setClients(prev => prev.map(c => 
      c.id === clientId ? { ...c, diaryEntries: [newEntry, ...c.diaryEntries] } : c
    ));
  };

  // Compute today's alerts for header (events happening today across all clients)
  const todaysAlerts = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const alerts = [];
    clients.forEach(client => {
      [...client.activities, ...client.meals]
        .filter(event => event.date === today && event.time)
        .forEach(event => {
          alerts.push({
            clientId: client.id,
            clientName: client.name,
            clientImageUrl: client.imageUrl,
            eventLabel: event.label,
            eventTime: event.time
          });
        });
    });
    // Sort alerts by time (ascending)
    return alerts.sort((a, b) => a.eventTime.localeCompare(b.eventTime));
  }, [clients]);

  return (
    <HashRouter>
      {/* App Container with dark background */}
      <div className="app-container">
        {/* Header with alerts dropdown */}
        <Header alerts={todaysAlerts} />
        {/* Main content area */}
        <main>
          <Routes>
            <Route path="/calendar/:id" element={<CalendarPage clients={clients} />} />
            <Route path="/" element={<HomePage clients={clients} />} />
            <Route path="/client/:clientId" element={
              <ClientProfilePage 
                clients={clients}
                onAddActivity={handleAddActivity}
                onAddMeal={handleAddMeal}
                onAddMoodEntry={handleAddMoodEntry}
                onAddDiaryEntry={handleAddDiaryEntry}
                onDeleteClient={handleDeleteClient}
                onDeleteActivity={handleDeleteActivity}
                onDeleteMeal={handleDeleteMeal}
              />
            } />
            <Route path="/client/:clientId/calendar" element={<CalendarPage clients={clients} />} />
            <Route path="/add-client" element={<AddClientPage onAddClient={handleAddClient} />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
