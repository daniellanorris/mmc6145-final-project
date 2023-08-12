import React, { useState } from 'react';


export default function Button({children, onClick}) {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    onClick
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
