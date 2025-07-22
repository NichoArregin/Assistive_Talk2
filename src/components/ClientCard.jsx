import React from 'react';
import { Link } from 'react-router-dom';

const ClientCard = ({ client }) => {
  return (
    <Link 
      to={`/client/${client.id}`} 
      className="block bg-slate-700 p-4 rounded-lg text-center hover:bg-slate-600 transition"
    >
      <img 
        src={client.imageUrl} 
        alt={client.name} 
        className="mx-auto mb-2 w-16 h-16 rounded-full object-cover" 
      />
      <h3 className="text-lg font-bold text-gray-100">{client.name}</h3>
    </Link>
  );
};

export default ClientCard;
