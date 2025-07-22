import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/ClientCard.css";

const ClientCard = ({ client }) => {
  return (
    <Link to={`/client/${client.id}`} className="client-card">
      <div className="client-image-wrapper">
        <img 
          src={client.imageUrl} 
          alt={client.name} 
          className="client-image" 
        />
      </div>
      <h3 className="client-name">{client.name}</h3>
    </Link>
  );
};

export default ClientCard;
