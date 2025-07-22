import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CustomCalendar from "../components/Calendar";

const CalendarPage = ({ clients }) => {
  const { id } = useParams();
  const [date, setDate] = useState(new Date());

  const client = clients.find((c) => c.id === id);
  if (!client) return <p>Client not found.</p>;

  const combinedEvents = [
    ...(client.activities || []).map((a) => ({
      ...a,
      type: "Activity",
    })),
    ...(client.meals || []).map((m) => ({
      ...m,
      type: "Meal",
    })),
  ].map((event) => ({
    date: event.date,
    label: `${event.type}: ${event.label}`,
  }));

  return (
    <div className="calendar-page">
      <h2>{client.name}'s Calendar</h2>
      <CustomCalendar value={date} onChange={setDate} events={combinedEvents} />
    </div>
  );
};

export default CalendarPage;
