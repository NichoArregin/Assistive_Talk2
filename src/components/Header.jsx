import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header({ todaysAlerts = [] }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Assistive Talk</h1>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/calendar" className="nav-link">Calendar</Link>
          <Link to="/add-client" className="nav-link">Add Client</Link>
        </nav>
      </div>
      <div className="header-right">
        {todaysAlerts.length > 0 && (
          <div className="reminder-alert">
            🔔 {todaysAlerts.length} Reminder{todaysAlerts.length > 1 ? "s" : ""} for today
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
