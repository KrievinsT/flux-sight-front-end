// Spinner.jsx
import React from 'react';

const SpinnerLoad = ({ size = 'h-5 w-5', color = 'border-blue-500', borderWidth = 'border-t-2' }) => {
    return (
        <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full ${size} ${borderWidth} ${color} border-solid`}></div>
        </div>
    );
};

export default SpinnerLoad;
