import React from 'react';

const GradientBackground: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 w-full h-full -z-10" 
      style={{
        background: 'linear-gradient(to bottom, #EAF5FF 0%, #F8FBFF 50%, #FFFFFF 100%)',
        pointerEvents: 'none'
      }}
    ></div>
  );
};

export default GradientBackground;