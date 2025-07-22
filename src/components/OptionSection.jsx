import React, { useState, useMemo } from 'react';
import OptionButton from './OptionButton';
import Icon from './Icon';
import AddOptionModal from './AddOptionModal';
import "../styles/OptionSection.css";

const OptionSection = ({ 
  title, 
  options, 
  defaultOptions, 
  onOptionClick, 
  onAddOption, 
  onDeleteOption, 
  searchPlaceholder 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  // Filter and sort options by date (newest first), based on search term
  const filteredOptions = useMemo(() => {
    return options
      .filter(opt => opt.label.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [options, searchTerm]);

  return (
    <div className="option-section card-section">
      <div className="option-section-header">
        <h3>{title}</h3>
        <div className="option-controls">
          <div className="search-wrapper">
            <Icon name="search" className="search-icon" />
            <input 
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="form-input option-search"
              placeholder={searchPlaceholder}
              aria-label={`Search ${title}`}
            />
          </div>
          <button 
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn btn-blue"
            aria-label={`Add new ${title}`}
          >
            <Icon name="plus" className="add-icon" />
          </button>
        </div>
      </div>

      {filteredOptions.length > 0 ? (
        <div className="options-grid">
          {filteredOptions.map(option => (
            <OptionButton 
              key={option.id}
              label={option.label}
              icon={option.icon}
              date={option.date}
              time={option.time}
              onClick={() => onOptionClick(option.label)}
              onDelete={() => onDeleteOption(option.id)}
            />
          ))}
        </div>
      ) : (
        <p className="no-options-msg">
          {searchTerm ? 'No results found.' : 'No options available. Add one to get started!'}
        </p>
      )}

      {/* Modal for adding a new option (activity/meal) */}
      <AddOptionModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddOption={(newOpt) => { onAddOption(newOpt.label, newOpt.icon, newOpt.date, newOpt.time); setModalOpen(false); }}
        defaultOptions={defaultOptions}
        type={title.slice(0, -1)}   /* pass "Activity" or "Meal" */
      />
    </div>
  );
};

export default OptionSection;
