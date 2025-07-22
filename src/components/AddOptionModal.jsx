import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import '../styles/Modal.css';

const AddOptionModal = ({ isOpen, onClose, onAddOption, defaultOptions, title }) => {
  const [tab, setTab] = useState('library');
  const [customLabel, setCustomLabel] = useState('');
  const [customIcon, setCustomIcon] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Reset form fields when opening the modal
  useEffect(() => {
    if (isOpen) {
      setTab('library');
      setCustomLabel('');
      setCustomIcon('');
      // Initialize date to today and time to now (current hour/minute)
      const today = new Date();
      setDate(today.toISOString().split('T')[0]);
      const hrs = today.getHours().toString().padStart(2, '0');
      const mins = today.getMinutes().toString().padStart(2, '0');
      setTime(`${hrs}:${mins}`);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAdd = (label, icon) => {
    if (!date || !time) {
      alert('Please select date and time.');
      return;
    }
    onAddOption(label, icon, date, time);
    // onClose will be called by parent or can be called here as well
  };

  const handleCustomAdd = () => {
    if (!customLabel.trim() || !customIcon.trim() || !date || !time) {
      alert('Please complete all fields.');
      return;
    }
    handleAdd(customLabel.trim(), customIcon.trim());
  };

  // Close modal when clicking outside the dialog
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        {/* Tabs for Library vs Custom */}
        <div className="tabs">
          <button 
            type="button" 
            onClick={() => setTab('library')} 
            className={tab === 'library' ? 'active' : ''}
          >
            Library
          </button>
          <button 
            type="button" 
            onClick={() => setTab('custom')} 
            className={tab === 'custom' ? 'active' : ''}
          >
            Custom
          </button>
        </div>

        {tab === 'library' ? (
          // Library options grid
          <div className="library-options">
            {defaultOptions.map((item, index) => (
              <button 
                key={index} 
                className="option" 
                onClick={() => handleAdd(item.label, item.icon)}
              >
                <Icon name={item.icon} className="option-icon-img" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ) : (
          // Custom option form
          <div className="custom-form">
            <input
              type="text"
              placeholder="Label"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
            />
            <input
              type="text"
              placeholder="Emoji/Icon"
              value={customIcon}
              onChange={(e) => setCustomIcon(e.target.value)}
            />
            <button type="button" onClick={handleCustomAdd}>Add</button>
          </div>
        )}

        {/* Date and Time selectors */}
        <div className="date-time-picker">
          <label>
            Date: 
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
            />
          </label>
          <label>
            Time: 
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              required 
            />
          </label>
        </div>

        <button type="button" onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default AddOptionModal;
