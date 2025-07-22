import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ClientCard from '../components/ClientCard';
import Icon from '../components/Icon';
import "../styles/HomePage.css";

const HomePage = ({ clients }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients;
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, clients]);

  // Card component for adding a new client profile
  const AddClientCard = () => (
    <Link to="/add-client" className="add-client-card" aria-label="Add new client">
      <div className="add-client-icon-wrapper">
        <Icon name="plus" className="add-client-icon" />
      </div>
      <span className="add-client-text">Add Client</span>
    </Link>
  );

  return (
    <div className="home-container">
      {/* Search bar */}
      <div className="search-bar">
        <Icon name="search" className="search-icon" />
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input search-input"
          placeholder="Search for a client..."
          aria-label="Search clients"
        />
      </div>

      {/* Clients grid */}
      <div className="client-grid">
        {/* Existing clients */}
        {filteredClients.length > 0 && filteredClients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}

        {/* No clients message */}
        {!searchTerm && clients.length === 0 && (
          <p className="no-clients-msg">No clients yet. Add one to get started!</p>
        )}
        {/* No search results message */}
        {searchTerm && filteredClients.length === 0 && (
          <p className="no-clients-msg">No clients found matching your search.</p>
        )}

        {/* Add Client card always at end */}
        <AddClientCard />
      </div>
    </div>
  );
};

export default HomePage;
