import React from "react";
import ClientCard from "../components/ClientCard";
import "./HomePage.css";

function HomePage({ clients }) {
  return (
    <div className="home">
      <h1>Client Dashboard</h1>
      <div className="card-grid">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
