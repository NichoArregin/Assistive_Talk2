import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ClientCard from '../components/ClientCard';
import Icon from '../components/Icon';

const HomePage = ({ clients }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = useMemo(() => {
    if (!searchTerm) return clients;
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, clients]);

  // Card for adding a new client
  const AddClientCard = () => (
    <Link 
      to="/add" 
      className="flex flex-col items-center justify-center p-4 bg-slate-700 rounded-lg text-gray-400 hover:bg-slate-600 hover:text-white transition"
    >
      <Icon name="plus" className="text-4xl mb-2" />
      <span className="font-medium">Add Client</span>
    </Link>
  );

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <Icon 
          name="search" 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 bg-slate-800 border border-slate-600 text-gray-100 placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search clients"
          aria-label="Search clients"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.length > 0 ? (
          filteredClients.map(client => (
            <ClientCard key={client.id} client={client} />
          ))
        ) : (
          !searchTerm && clients.length === 0 && (
            <p className="text-center text-gray-400 py-4">
              No clients yet. Add one to get started!
            </p>
          )
        )}
        {searchTerm && filteredClients.length === 0 && (
          <p className="text-center text-gray-400 py-4">
            No clients found matching your search.
          </p>
        )}
        <AddClientCard />
      </div>
    </div>
  );
};

export default HomePage;
