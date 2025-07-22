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

  // Card component for adding a new client (styled as in original)
  const AddClientCard = () => (
    <Link 
      to="/add-client"
      aria-label="Add new client"
      className="group flex flex-col items-center justify-center bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-xl shadow-lg hover:shadow-blue-500/20 hover:border-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-75"
    >
      <div className="text-slate-500 group-hover:text-blue-400 transition-colors duration-300 p-4">
        <Icon name="plus" className="w-16 h-16" />
      </div>
      <p className="font-bold text-slate-400 group-hover:text-gray-100 transition-colors duration-300">
        Add Client
      </p>
    </Link>
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search bar */}
      <div className="relative mb-8">
        <Icon 
          name="search" 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" 
        />
        <input 
          type="text"
          placeholder="Search for a client..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 bg-slate-800 border border-slate-600 text-gray-100 placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search clients"
        />
      </div>

      {/* Clients grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Add Client card first */}
        <AddClientCard />
        {/* Client list or empty state */}
        {filteredClients.length > 0 ? (
          filteredClients.map(client => (
            <ClientCard key={client.id} client={client} />
          ))
        ) : (
          !searchTerm && clients.length === 0 ? (
            // No clients at all
            <div className="col-span-full text-center py-10 px-4">
              <p className="text-gray-400 text-lg">
                No clients yet. Add one to get started!
              </p>
            </div>
          ) : (
            // No results for search
            <div className="col-span-full text-center py-10 px-4">
              <p className="text-gray-400 text-lg">
                No clients found matching your search.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
