// src/pages/HomePage.jsx
import React from "react";
import ClientCard from "../components/ClientCard";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage({ clients }) {
  return (
    <div className="homepage-container">
      <div className="header-row">
        <h1>Assistive Talk</h1>
        <Link to="/add" className="add-btn">+ Add Client</Link>
      </div>
      <div className="client-grid">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
