import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header({ todaysAlerts }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="header">
      <div className="title">
        <Link to="/">Assistive Talk</Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/add">Add Client</Link>
        <div className="alerts" onClick={() => setShowDropdown(!showDropdown)}>
          🔔 {todaysAlerts.length}
          {showDropdown && (
            <div className="alerts-dropdown">
              {todaysAlerts.length === 0 ? (
                <p>No events today</p>
              ) : (
                todaysAlerts.map((alert, i) => (
                  <div key={i}>
                    <strong>{alert.clientName}</strong>: {alert.label} at {alert.time}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
