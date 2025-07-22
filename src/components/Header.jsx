import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import "../styles/Header.css";

function Header({ alerts = [] }) {
  const [isAlertsOpen, setAlertsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close alerts dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAlertsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format event time (HH:MM AM/PM)
  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <header className="header">
      {/* Left side: App title and tagline */}
      <div>
        <h1 className="logo">
          <Link to="/" className="home-link">Assistive Talk</Link>
        </h1>
        <p className="tagline">Empowering communication for everyone</p>
      </div>

      {/* Right side: Alerts bell icon */}
      <div className="header-right" ref={dropdownRef}>
        <button 
          className="alerts-button" 
          onClick={() => setAlertsOpen(open => !open)} 
          aria-label="View today's alerts"
        >
          <Icon name="bell" className="bell-icon" />
          {alerts.length > 0 && <span className="alert-badge"></span>}
        </button>

        {/* Dropdown menu for today's events */}
        {isAlertsOpen && (
          <div className="alerts-menu">
            <div className="alerts-header">
              <h4>Today's Events</h4>
            </div>
            {alerts.length > 0 ? (
              <ul className="alerts-list">
                {alerts.map((alert, idx) => (
                  <li key={idx}>
                    <Link 
                      to={`/client/${alert.clientId}`} 
                      className="alert-item" 
                      onClick={() => setAlertsOpen(false)}
                    >
                      <img src={alert.clientImageUrl} alt={alert.clientName} />
                      <div className="alert-text">
                        <p className="alert-client-name">{alert.clientName}</p>
                        <p className="alert-event-label">{alert.eventLabel}</p>
                      </div>
                      <span className="alert-time">{formatTime(alert.eventTime)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-alerts">No events scheduled for today.</p>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
