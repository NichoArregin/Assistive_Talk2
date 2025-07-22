import React from "react";
import { useParams } from "react-router-dom";
import ClientCalendar from "../components/Calendar";

function CalendarPage({ clients }) {
  const { id } = useParams();
  const client = clients.find((c) => c.id === id);

  if (!client) return <p>Client not found</p>;

  const scheduledOptions = [...client.activities, ...client.meals];

  return (
    <div className="container">
      <h2>{client.name}'s Calendar</h2>
      <ClientCalendar scheduledOptions={scheduledOptions} />
    </div>
  );
}

export default CalendarPage;
