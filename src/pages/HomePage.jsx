// src/pages/HomePage.jsx
import React, { useState } from "react";
import ClientCard from "../components/ClientCard";
import TodayAlerts from "../components/TodayAlerts";

function HomePage({ clients }) {
  const [search, setSearch] = useState("");

  const filtered = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="homepage">
      <input
        type="text"
        placeholder="Search clients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TodayAlerts clients={clients} />

      <div className="client-grid">
        {filtered.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
