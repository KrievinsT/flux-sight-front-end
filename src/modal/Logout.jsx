import React, { useState, useEffect, useRef } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

const Logout = ({ darkMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    const keysToRemove = [
      'token', 'id', 'name', 'username', 'user', 'auth_token',
      'user_email', 'user_id', 'user_name', 'email', 'phone'
    ];
  
    keysToRemove.forEach(key => {
      if (localStorage.getItem(key) !== null) {
        localStorage.removeItem(key);
        console.log(`Removed ${key} from localStorage`);
      }
      if (sessionStorage.getItem(key) !== null) {
        sessionStorage.removeItem(key);
        console.log(`Removed ${key} from sessionStorage`);
      }
    });
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <FaRegUserCircle
        className={`w-5 h-5 cursor-pointer ${darkMode ? "text-gray-300 hover:text-[#fff]" : " text-gray-600 hover:text-gray-800"}`}
        onClick={() => setDropdownOpen((prev) => !prev)}
      />

      <CSSTransition
        in={dropdownOpen} 
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="absolute right-0 border border-gray-200 mt-3 w-[5.8rem] bg-white rounded-lg z-50">
          <div className="absolute -top-2 right-1.5 w-4 h-4 border-t border-l border-gray-200 bg-white transform rotate-45 z-[-100]"></div>
          <button
            onClick={handleLogout}
            className="text-white bg-gradient-to-r shadow-md from-purple-500 to-pink-500 
              hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 
              dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center 
              ml-1 mt-2 mb-2 transition-colors duration-300 ease-in-out"
          >
            Log Out
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Logout;
