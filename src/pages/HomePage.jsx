import React from "react";
import ClientCard from "../components/ClientCard";
import ReminderList from "../components/ReminderList";
import "../styles/HomePage.css";

const HomePage = ({ clients, reminders }) => {
  return (
    <div className="homepage-container">
      <ReminderList reminders={reminders} />
      <h2>Client List</h2>
      <div className="client-grid">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
