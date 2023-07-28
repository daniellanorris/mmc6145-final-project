import React, { useState } from 'react';

export default function Button({children}) {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
    // Remove the 'clicked' class after the animation is complete
    setTimeout(() => {
      setClicked(false);
    }, 200);
  };

  return (
    <button className={`button ${clicked ? 'clicked' : ''}`} onClick={handleButtonClick}>
        {children}
    </button>
  );
};
