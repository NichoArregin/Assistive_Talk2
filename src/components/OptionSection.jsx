import React, { useState, useMemo } from 'react';
import OptionButton from './OptionButton';
import Icon from './Icon';
import AddOptionModal from './AddOptionModal';
import '../styles/OptionSection.css';

const OptionSection = ({ 
  title,
  options,
  defaultOptions,
  onOptionClick,
  onAddOption,
  onDeleteOption,
  searchPlaceholder,
  optionTypeName
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    // Filter options by search term (case-insensitive)
    const filtered = options.filter(opt =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Sort filtered options by date (newest first)
    return filtered.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [options, searchTerm]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="option-section">
      <div className="option-header">
        <h3>{title}</h3>
        <div className="search-group">
          <div className="search-container">
            <Icon name="search" className="search-icon" />
            <input 
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input search-input"
              aria-label={`Search ${optionTypeName}s`}
            />
          </div>
          <button 
            type="button"
            onClick={openModal} 
            className="btn btn-blue" 
            aria-label={`Add new ${optionTypeName}`}
          >
            <Icon name="plus" className="icon-sm" />
          </button>
        </div>
      </div>

      {filteredOptions.length > 0 ? (
        <div className="option-grid">
          {filteredOptions.map(option => (
            <OptionButton 
              key={option.id}
              label={option.label}
              icon={option.icon}
              date={option.date}
              time={option.time}
              onDelete={() => onDeleteOption(option.id)}
              // Note: onOptionClick is optional since OptionButton handles TTS internally
            />
          ))}
        </div>
      ) : (
        <p className="no-options">
          {searchTerm ? 'No results found.' : 'No options available. Add one to get started!'}
        </p>
      )}

      <AddOptionModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddOption={(label, icon, date, time) => {
          onAddOption(label, icon, date, time);
          closeModal();
        }}
        defaultOptions={defaultOptions}
        title={`Add ${optionTypeName}`}
      />
    </div>
  );
};

export default OptionSection;
