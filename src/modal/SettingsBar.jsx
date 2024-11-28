import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";

const SettingsBar = ({ isOpen, onClose }) => {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedSidenavType, setSelectedSidenavType] = useState("White");
  const [color, setColor] = useState("blue"); 

  const handleNavbarFixedToggle = () => setIsNavbarFixed(!isNavbarFixed);
  const handleDarkModeToggle = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    const savedColor = localStorage.getItem("sidebarColor");
    if (savedColor) {
      setColor(savedColor);
    }
  }, []);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    localStorage.setItem("sidebarColor", newColor); 
    window.dispatchEvent(new Event("storage"));  
  };

  const handleSidenavTypeChange = (type) => {
    setSelectedSidenavType(type);
    localStorage.setItem("sidebarType", type);
    window.dispatchEvent(new Event("storage"));  
  };

  
  useEffect(() => {
    const savedType = localStorage.getItem("sidebarType");
    if (savedType) {
      setSelectedSidenavType(savedType);
    }
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-end transition-opacity duration-300 ${
        isOpen ? "" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white dark:bg-gray-800 shadow-lg h-full w-[350px] p-4 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header */}
        <div className="card-header pb-2 flex justify-between">
          <div>
            <h5 className="mt-3 mb-0 text-xl font-medium">
              Material UI Configurator
            </h5>
            <p className="text-lg text-gray-600">See our dashboard options.</p>
          </div>
          <button
            className="absolute top-14 right-6 text-gray-600 text-2xl font-bold hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
            <IoCloseOutline />
          </button>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-4 mb-4"></div>

        <div>
        <h6 className="text-lg font-medium mb-2">Sidebar Colors</h6>
        <div className="flex space-x-2">
          <span
            onClick={() => handleColorChange("blue")}
            className={`w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full cursor-pointer hover:border-2 hover:border-black hover:scale-110 transition-all ${
              color === "blue" ? "border-2 border-black" : ""
            }`}
          ></span>
          <span
            onClick={() => handleColorChange("gray")}
            className={`w-6 h-6 bg-gradient-to-br from-gray-800 to-black rounded-full cursor-pointer hover:border-2 hover:border-black hover:scale-110 transition-all ${
              color === "gray" ? "border-2 border-black" : ""
            }`}
          ></span>
          <span
            onClick={() => handleColorChange("pink")}
            className={`w-6 h-6 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full cursor-pointer hover:border-2 hover:border-black hover:scale-110 transition-all ${
              color === "pink" ? "border-2 border-black" : ""
            }`}
          ></span>
          <span
            onClick={() => handleColorChange("green")}
            className={`w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full cursor-pointer hover:border-2 hover:border-black hover:scale-110 transition-all ${
              color === "green" ? "border-2 border-black" : ""
            }`}
          ></span>
          <span
            onClick={() => handleColorChange("yellow")}
            className={`w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full cursor-pointer hover:border-2 hover:border-black hover:scale-110 transition-all ${
              color === "yellow" ? "border-2 border-black" : ""
            }`}
          ></span>
          <span
            onClick={() => handleColorChange("red")}
            className={`w-6 h-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full cursor-pointer hover:border-2 hover:border-black hover:scale-110 transition-all ${
              color === "red" ? "border-2 border-black" : ""
            }`}
          ></span>
        </div>
      </div>

      <div className="mt-4">
      <h6 className="text-lg font-medium">Sidenav Type</h6>
      <p className="text-md text-gray-600 pb-3">Choose between different sidenav types.</p>
      <div className="flex space-x-2 mt-2">
        <button
          className={`px-3 py-1 rounded-md border border-gray-300 ${
            selectedSidenavType === "Dark" ? "bg-gray-800 text-white shadow-lg" : "bg-transparent text-black"
          }`}
          onClick={() => handleSidenavTypeChange("Dark")}
        >
          Dark
        </button>
        <button
          className={`px-3 py-1 rounded-md border border-gray-300 ${
            selectedSidenavType === "Transparent" ? "bg-gray-800 text-white shadow-lg" : "bg-transparent text-black"
          }`}
          onClick={() => handleSidenavTypeChange("Transparent")}
        >
          Transparent
        </button>
        <button
          className={`px-3 py-1 rounded-md border border-gray-300 ${
            selectedSidenavType === "White" ? "bg-gray-800 text-white shadow-lg" : "bg-transparent text-black"
          }`}
          onClick={() => handleSidenavTypeChange("White")}
        >
          White
        </button>
      </div>
    </div>

        {/* NAVBAR */}
        <div className="mt-4 flex justify-between items-center">
          <h6 className="text-lg font-medium text-gray-700">Navbar Fixed</h6>

          <div className="relative inline-flex">
            <div className="w-11 h-5">
              <input
                id="navbar-fixed-toggle"
                type="checkbox"
                className="peer appearance-none w-12 h-6 bg-gray-300  rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                checked={isNavbarFixed}
                onChange={handleNavbarFixedToggle}
              />
              <label
                htmlFor="navbar-fixed-toggle"
                className="absolute top-[-2px] left-0 h-7 w-7 cursor-pointer rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-300 
                          before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 
                          before:rounded-full before:bg-slate-400 before:opacity-0 before:transition-opacity hover:before:opacity-10 
                          peer-checked:translate-x-6 peer-checked:border-slate-800"
              ></label>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-4 mb-4"></div>
            
            {/* Light/Dark Mode */}
        <div className="mt-4 flex justify-between items-center">
          <h6 className="text-lg font-medium text-gray-700">Light / Dark</h6>

          <div className="relative inline-flex">
            <div className="w-11 h-5">
              <input
                id="light-dark-toggle"
                type="checkbox"
                className="peer appearance-none w-12 h-6 bg-gray-300 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300"
                checked={isDarkMode}
                onChange={handleDarkModeToggle}
              />
              <label
                htmlFor="light-dark-toggle"
                className="absolute top-[-2px] left-0 h-7 w-7 cursor-pointer rounded-full border border-gray-300 bg-white shadow-sm transition-all duration-300 
                          before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 
                          before:rounded-full before:bg-gray-400 before:opacity-0 before:transition-opacity hover:before:opacity-10 
                          peer-checked:translate-x-6 peer-checked:border-slate-800"
              >
                <div
                  className="top-2/4 left-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full"
                  data-ripple-dark="true"
                ></div>
              </label>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-4 mb-4"></div>

        {/* Displaying states for testing */}
        <div className="mt-6">
          <p>Navbar Fixed: {isNavbarFixed ? "Enabled" : "Disabled"}</p>
          <p>Dark Mode: {isDarkMode ? "Enabled" : "Disabled"}</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsBar;
