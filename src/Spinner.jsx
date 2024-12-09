import React from 'react';

const Spinner = ({ size = 'h-32 w-32', color = 'border-blue-500' }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`animate-spin rounded-full ${size} border-t-4 ${color} border-solid`}></div>
    </div>
  );
};

export default Spinner;
