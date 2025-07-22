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
  } catch (error) {
    console.error(`Failed to initialize from localStorage for key ${key}`, error);
    return defaultValue;
  }
};

function App() {
  const [clients, setClients] = useState(() => getInitialState(CLIENTS_STORAGE_KEY, []));

  useEffect(() => {
    try {
      localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
    } catch (error) {
      console.error('Failed to save clients to localStorage', error);
    }
  }, [clients]);

  // Handlers to modify clients state (same as before)
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
    const newActivity = { id: `act_${Date.now()}`, label, icon, date, time };
    setClients(prev => prev.map(client =>
      client.id === clientId 
        ? { ...client, activities: [...client.activities, newActivity] } 
        : client
    ));
  };
  const handleDeleteActivity = (clientId, activityId) => {
    setClients(prev => prev.map(client =>
      client.id === clientId 
        ? { ...client, activities: client.activities.filter(act => act.id !== activityId) } 
        : client
    ));
  };
  const handleAddMeal = (clientId, label, icon, date, time) => {
    const newMeal = { id: `meal_${Date.now()}`, label, icon, date, time };
    setClients(prev => prev.map(client =>
      client.id === clientId 
        ? { ...client, meals: [...client.meals, newMeal] } 
        : client
    ));
  };
  const handleDeleteMeal = (clientId, mealId) => {
    setClients(prev => prev.map(client =>
      client.id === clientId 
        ? { ...client, meals: client.meals.filter(meal => meal.id !== mealId) } 
        : client
    ));
  };
  const handleAddMoodEntry = (clientId, mood) => {
    const newMoodEntry = { id: `mood_${Date.now()}`, mood, timestamp: new Date().toISOString() };
    setClients(prev => prev.map(client =>
      client.id === clientId 
        ? { 
            ...client, 
            moodHistory: [newMoodEntry, ...client.moodHistory].slice(0, 5) 
          } 
        : client
    ));
  };
  const handleAddDiaryEntry = (clientId, content) => {
    const newDiaryEntry = { id: `diary_${Date.now()}`, content, timestamp: new Date().toISOString() };
    setClients(prev => prev.map(client =>
      client.id === clientId 
        ? { ...client, diaryEntries: [newDiaryEntry, ...client.diaryEntries] } 
        : client
    ));
  };

  // Compute today's alerts for header (same logic as before)
  const todaysAlerts = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const alerts = [];
    clients.forEach(client => {
      const allEvents = [...client.activities, ...client.meals];
      const todayEvents = allEvents.filter(event => event.date === today && event.time);
      todayEvents.forEach(event => {
        alerts.push({
          clientId: client.id,
          clientName: client.name,
          clientImageUrl: client.imageUrl,
          eventLabel: event.label,
          eventTime: event.time
        });
      });
    });
    // Sort alerts by time
    return alerts.sort((a, b) => a.eventTime.localeCompare(b.eventTime));
  }, [clients]);

  return (
    <HashRouter>
      {/* Container with full-screen min height, dark background, base font and text color */}
      <div className="min-h-screen bg-slate-900 font-sans text-gray-100">
        {/* Header with alerts */}
        <Header alerts={todaysAlerts} />
        {/* Main content area with some padding */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
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
            {/* Use original nested calendar path: /client/:clientId/calendar */}
            <Route path="/client/:clientId/calendar" element={<CalendarPage clients={clients} />} />
            {/* Use original add-client path: /add-client */}
            <Route path="/add-client" element={<AddClientPage onAddClient={handleAddClient} />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
