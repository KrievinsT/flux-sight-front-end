import React from 'react';

const SettingsBar = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-end "
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 shadow-lg h-full w-[400px] p-4"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="card-header pb-0  flex justify-between">
          <div>
            <h5 className="mt-3 mb-0 text-lg font-semibold">Material UI Configurator</h5>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              See our dashboard options.
            </p>
          </div>
          <button
            className="absolute top-13 right-6 text-gray-600 text-xl font-semibold hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
           X
          </button>
        </div>

        <hr className="horizontal dark:border-gray-700 my-2" />

        {/* Sidebar Colors */}
        <div>
          <h6 className="text-md font-medium mb-2">Sidebar Colors</h6>
          <div className="flex space-x-2">
            <span
              className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full cursor-pointer"
            ></span>
            <span
              className="w-6 h-6 bg-gradient-to-br from-gray-800 to-black rounded-full cursor-pointer"
            ></span>
            <span
              className="w-6 h-6 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full cursor-pointer"
            ></span>
            <span
              className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full cursor-pointer"
            ></span>
            <span
              className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full cursor-pointer"
            ></span>
            <span
              className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full cursor-pointer"
            ></span>
          </div>
        </div>

        {/* Sidenav Type */}
        <div className="mt-4">
          <h6 className="text-md font-medium">Sidenav Type</h6>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Choose between different sidenav types.
          </p>
          <div className="flex space-x-2 mt-2">
            <button className="btn bg-gray-800 text-white px-3 py-1 rounded-md">
              Dark
            </button>
            <button className="btn bg-transparent text-black px-3 py-1 rounded-md border border-gray-300">
              Transparent
            </button>
            <button className="btn bg-white text-black px-3 py-1 rounded-md border border-gray-300">
              White
            </button>
          </div>
        </div>

        {/* Navbar Fixed */}
        <div className="mt-4 flex justify-between items-center">
          <h6 className="text-md font-medium">Navbar Fixed</h6>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <hr className="horizontal dark:border-gray-700 my-3" />

        {/* Light/Dark Mode */}
        <div className="mt-4 flex justify-between items-center">
          <h6 className="text-md font-medium">Light / Dark</h6>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <hr className="horizontal dark:border-gray-700 my-4" />

        {/* Buttons */}
        <a
          href="#"
          className="btn bg-blue-500 text-white w-full py-2 rounded-md text-center"
        >
          Free Download
        </a>
        <a
          href="#"
          className="btn border border-gray-400 text-black w-full py-2 mt-2 rounded-md text-center"
        >
          View documentation
        </a>

        {/* Social Buttons */}
        <div className="w-full text-center mt-4">
          <h6 className="text-md font-medium">Thank you for sharing!</h6>
          <div className="flex justify-center space-x-2 mt-2">
            <a href="#" className="btn bg-black text-white px-3 py-1 rounded-md">
              <i className="fab fa-twitter mr-1"></i> Tweet
            </a>
            <a href="#" className="btn bg-black text-white px-3 py-1 rounded-md">
              <i className="fab fa-facebook-square mr-1"></i> Share
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsBar;
