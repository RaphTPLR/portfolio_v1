// CustomCursor.jsx
import React from 'react';
import Particles from 'react-mouse-particles';
import '../style/cursor.scss';

const CustomCursor = () => {
  return (
    <div className="cursors">
      <Particles
        count={10}
        color="white"
        interactive={true}
      />
    </div>
  );
};

export default CustomCursor;
