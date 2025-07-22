import React from 'react';

const Icon = ({ name, className }) => {
  const icons = {
    // Activities
    beach: '🏖️',
    park: '🌳',
    walk: '🚶',
    picnic: '🧺',
    zoo: '🦁',
    farm: '🚜',
        playground: '🛝'
      };
    
      return (
        <span className={className}>
          {icons[name] || '❓'}
        </span>
      );
    }

    export default Icon;