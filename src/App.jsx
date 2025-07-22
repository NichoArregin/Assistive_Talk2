import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClientProfilePage from './pages/ClientProfilePage';
import CalendarPage from './pages/CalendarPage';
import AddClientPage from './pages/AddClientPage';
import Header from './components/Header';
import "./styles/Header.css"; // If not already imported there

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

  // Persist clients to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
    } catch (error) {
      console.error('Failed to save clients to localStorage', error);
    }
  }, [clients]);

  // Handlers to modify clients state
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
            moodHistory: [newMoodEntry, ...client.moodHistory].slice(0, 5)  // keep last 5 moods
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

  // Compute today's alerts (events happening today) for the header
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
      <Header alerts={todaysAlerts} />
      <Routes>
        <Route path="/" element={<HomePage clients={clients} />} />
        <Route 
          path="/client/:clientId" 
          element={
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
          } 
        />
        <Route path="/calendar/:clientId" element={<CalendarPage clients={clients} />} />
        <Route path="/add" element={<AddClientPage onAddClient={handleAddClient} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
