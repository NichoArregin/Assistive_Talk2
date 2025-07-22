import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

const Header = ({ alerts }) => {
  const [isAlertsOpen, setAlertsOpen] = useState(false);
  const alertsRef = useRef(null);

  // Close the alerts dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (alertsRef.current && !alertsRef.current.contains(event.target)) {
        setAlertsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <header className="bg-slate-800 px-4 py-3 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-white">Assistive Talk</h1>
        <p className="text-sm text-gray-300">Empowering communication for everyone</p>
      </div>
      <div className="relative" ref={alertsRef}>
        <button 
          onClick={() => setAlertsOpen(prev => !prev)} 
          className="relative p-2 rounded-full text-gray-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white" 
          aria-label="View alerts"
        >
          <Icon name="bell" className="text-2xl" />
          {alerts.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
        {isAlertsOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-slate-800 text-gray-100 rounded-lg shadow-lg overflow-hidden z-50">
            <h4 className="px-4 py-2 text-lg font-semibold border-b border-slate-700">Today&apos;s Events</h4>
            <ul className="max-h-60 overflow-y-auto">
              {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <li 
                    key={index} 
                    onClick={() => setAlertsOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition-colors"
                  >
                    <img 
                      src={alert.clientImageUrl} 
                      alt={alert.clientName} 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                    <div className="flex-1">
                      <p className="text-gray-100">{alert.clientName}</p>
                      <p className="text-gray-400 text-sm">{alert.eventLabel}</p>
                    </div>
                    <span className="text-gray-500 text-xs">{formatTime(alert.eventTime)}</span>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-gray-400 text-sm">
                  No events scheduled for today.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
