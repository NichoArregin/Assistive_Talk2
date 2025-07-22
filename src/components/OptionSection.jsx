import React, { useState, useMemo } from 'react';
import OptionButton from './OptionButton';
import Icon from '../components/Icon';
import AddOptionModal from './AddOptionModal';
import "../styles/OptionSection.css"
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

  // Filter and sort options based on search term
  const filteredOptions = useMemo(() => {
    return options
      .filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [options, searchTerm]);

  return (
    <div className="option-section">
      <h3 className="text-lg font-semibold text-gray-100 mb-2">{title}</h3>
      {/* Search input and Add button */}
      <div className="flex items-center mb-4">
        <div className="relative flex-grow">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <input 
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-9 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            placeholder={searchPlaceholder}
            aria-label={`Search ${title}`}
          />
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="ml-2 flex-shrink-0 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 transition"
          aria-label={`Add new ${title}`}
        >
          <Icon name="plus" className="w-5 h-5" />
        </button>
      </div>

      {/* Options list */}
      {filteredOptions.length > 0 ? (
        <div className="space-y-2">
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
        <p className="text-gray-300">
          {searchTerm ? 'No results found.' : 'No options available. Add one to get started!'}
        </p>
      )}

      {/* Modal for adding a new option */}
      <AddOptionModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddOption={onAddOption}
        defaultOptions={defaultOptions}
        title={`Add ${optionTypeName}`}
      />
    </div>
  );
};

export default OptionSection;
