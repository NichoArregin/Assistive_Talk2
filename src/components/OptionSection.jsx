import React, { useState, useMemo } from 'react';
import OptionButton from './OptionButton';
import Icon from './Icon';
import AddOptionModal from './AddOptionModal';
// Removed: import "../styles/OptionSection.css";

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
    // Container for the whole section (background card)
    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg mb-6">
      {/* Section header: title, search box, and add button */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-2xl font-semibold text-gray-200">
          {title}
        </h3>
        <div className="flex-grow sm:flex-grow-0 flex items-center gap-2">
          <div className="relative flex-grow">
            {/* Search icon inside input */}
            <Icon name="search" className="w-5 h-5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-9 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
              aria-label={`Search ${title}`}
            />
          </div>
          <button 
            onClick={() => setModalOpen(true)}
            className="flex-shrink-0 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 transition"
            aria-label={`Add new ${title}`}
          >
            <Icon name="plus" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Options list */}
      {filteredOptions.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredOptions.map(option => (
            <OptionButton 
              key={option.id}
              label={option.label}
              icon={option.icon}
              date={option.date}
              time={option.time}
              onDelete={() => onDeleteOption(option.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 mt-4 text-center">
          {searchTerm ? 'No results found.' : 'No options available. Add one to get started!'}
        </p>
      )}

      {/* Add Option Modal */}
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
