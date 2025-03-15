import React from 'react';

const BackgroundGradient: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black text-white overflow-hidden">
      <div className="absolute top-[-40%] left-[-20%] w-[70%] h-[70%] rounded-full bg-[#0EA5E9]/20 blur-[120px]"></div>
      <div className="absolute bottom-[-40%] right-[-20%] w-[70%] h-[70%] rounded-full bg-[#1EAEDB]/20 blur-[120px]"></div>
    </div>
  );
};

export default BackgroundGradient;
