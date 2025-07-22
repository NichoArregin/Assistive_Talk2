import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AddClientPage from "./pages/AddClientPage";
import ClientProfilePage from "./pages/ClientProfilePage";
import CalendarPage from "./pages/CalendarPage";
import { loadClients, saveClients } from "./data/clients";

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const storedClients = loadClients();
    if (storedClients) {
      setClients(storedClients);
    }
  }, []);

  useEffect(() => {
    saveClients(clients);
  }, [clients]);

  const handleAddClient = (client) => {
    setClients([...clients, client]);
  };

  const handleDeleteClient = (clientId) => {
    setClients(clients.filter((c) => c.id !== clientId));
  };

  const handleUpdateClient = (updatedClient) => {
    setClients(
      clients.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
  };

  const todaysAlerts = clients.flatMap((client) =>
    client.options?.filter((opt) => {
      const today = new Date().toISOString().split("T")[0];
      return opt.date === today;
    }).map((opt) => ({ ...opt, clientName: client.name }))
  );

  return (
    <Router>
      <Header todaysAlerts={todaysAlerts} />
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
              onUpdateClient={handleUpdateClient}
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
