// src/components/ClientCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/ClientCard.css";

const placeholder = "https://via.placeholder.com/150?text=Client";

function ClientCard({ client }) {
  return (
    <Link to={`/client/${client.id}`} className="client-card">
      <img
        src={client.image || placeholder}
        alt={client.name}
        className="client-image"
      />
      <div className="client-name">{client.name}</div>
    </Link>
  );
}

export default ClientCard;
