import React from 'react';

const Icon = ({ name, className }) => {
  const icons = {
    // Activities (use representative emojis)
    beach: '🏖️',
    park: '🌳',
    walk: '🚶',
    picnic: '🧺',
    zoo: '🦁',
    farm: '🚜',
    playground: '🛝',
    fishing: '🎣',
    music: '🎵',
    pettingZoo: '🐐',
    bowling: '🎳',
    movies: '🎬',
    museum: '🏛️',
    aquarium: '🐠',
    artGallery: '🖼️',
    library: '📚',
    shopping: '🛍️',
    communityCentre: '🏫',
    swimming: '🏊',
    concert: '🎶',
    boardGames: '🎲',
    gardening: '🌱',
    crafts: '✂️',
    dance: '💃',
    cooking: '👩‍🍳',
    sensory: '🌈',
    videoGames: '🎮',
    karaoke: '🎤',
    puzzle: '🧩',
    hydrotherapy: '💧',
    gym: '🏋️',
    wheelchair: '♿',
    yoga: '🧘',
    petTherapy: '🐕',
    meditation: '🧘‍♂️',  // same yoga emoji with different gender

    // Meals
    cereal: '🥣',
    toast: '🍞',
    eggs: '🥚',
    porridge: '🥣',
    smoothie: '🥤',
    sandwich: '🥪',
    nuggets: '🍗',
    pasta: '🍝',
    soup: '🍲',
    sushi: '🍣',
    rice: '🍚',
    sausages: '🌭',
    chicken: '🍗',
    stirFry: '🍜',
    pizza: '🍕',
    fruit: '🍎',
    crackers: '🧀',   // using cheese for crackers & cheese
    yogurt: '🥛',     // milk as a stand-in for yogurt
    muffin: '🧁',
    cookies: '🍪',
    water: '💧',
    juice: '🧃',
    milk: '🥛',
    hotChocolate: '☕',

    // Mood icons
    moodHappy: '😊',
    moodContent: '🙂',
    moodSad: '😢',
    moodUpset: '😠',

    // UI/icons
    plus: '➕',
    search: '🔍',
    user: '👤',
    bell: '🔔',
    calendar: '📅',
    close: '✖️'
  };

  return (
    <span className={className}>
      {icons[name] || '❓'}
    </span>
  );
};

export default Icon;
