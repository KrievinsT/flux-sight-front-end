import React, { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import axios from "axios";
import SettingsBar from '../modal/SettingsBar';

import NotificationDropdown from "../modal/NotificationDropdown";
import SidebarModal from "../modal/Sidebar";
import Logout from '../modal/Logout';
import SpinnerLoad from "../SpinnerLoad";

import { Link, useNavigate } from 'react-router-dom';

export default function AddWebsite() {

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let username = sessionStorage.getItem('username');

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    username: username,
    memberName: "",
    memberEmail: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    url: "",
    memberName: "",
    memberEmail: "",
  });

  const validateInput = (name, value) => {
    let error = "";

    if (name === "title" && value.trim().length < 3) {
      error = "Website name must be at least 3 characters long.";
    } else if (name === "title" && /<[^>]*>/g.test(value)) {
      error = "The title field contains HTML tags, which are not allowed.";
    } else if (name === "url" && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
      error = "Enter a valid URL (e.g., https://example.com).";
    } else if (name === "url" && /<[^>]*>/g.test(value)) {
      error = "The URL field contains HTML tags, which are not allowed.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    validateInput(name, value);

    const updatedErrors = {};
    Object.keys({ ...formData, [name]: value }).forEach((field) => {
      validateInput(field, formData[field]);
    });

    setErrors(updatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const value = formData[field];
      let error = "";

      if (field === "title" && value.trim().length < 3) {
        error = "Website name must be at least 3 characters long.";
      } else if (field === "title" && /<[^>]*>/g.test(value)) {
        error = "The title field contains HTML tags, which are not allowed.";
      } else if (field === "url" && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
        error = "Enter a valid URL (e.g., https://example.com).";
      } else if (field === "url" && /<[^>]*>/g.test(value)) {
        error = "The URL field contains HTML tags, which are not allowed.";
      }

      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    const hasErrors = Object.keys(newErrors).length > 0;

    if (!hasErrors) {
      try {
        const response = await axios.post('/web/store', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          console.log("Form submitted successfully:", response.data);
          navigate('/dashboard'); // Redirect on success
        } else {
          console.log("Unexpected response:", response.data);
        }
      } catch (error) {
        console.error("Error submitting form:", error.response ? error.response.data : error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          submit: "Error submitting form: " + (error.response ? error.response.data.message : error.message)
        }));
      }
    } else {
      console.log("Please fix the errors before submitting.", formData);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectUser = (userId) => {
    alert(`User with ID ${userId} selected`);
  };


  const [navbarFixed, setNavbarFixed] = useState(() => {
    return JSON.parse(localStorage.getItem('navbarFixed')) || false;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });


  useEffect(() => {
    document.body.style.backgroundColor = darkMode
      ? "rgb(23,23,23)"
      : "rgb(243,244,246)";
  }, [darkMode]);

  useEffect(() => {
    const storedNavbarFixed = JSON.parse(localStorage.getItem('navbarFixed'));
    setNavbarFixed(storedNavbarFixed);  // Sync with localStorage on component load
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    setDarkMode(storedDarkMode);
  }, []);

  return (
    <div className="min-h-screen ml-[15rem] flex p-2">
     <SidebarModal darkMode={darkMode} />

        {/* Main content */}
        <div className={`flex-1 pl-4 pr-2 overflow-y-auto ${navbarFixed ? "mt-[5.7%]" : ""}`}>
          <header
            className={`flex items-center justify-between mb-8  ${navbarFixed
              ? `fixed top-0 ml-[15rem] rounded-lg p-2 left-4 right-0 z-50 shadow-md ${darkMode
                ? "bg-gradient-to-br from-[#323a54] to-[#1a2035]"
                : "bg-white text-black"
              }`
              : ""
              }`}
          >

          <div className={`pl-3 flex items-center text-[16px] font-small ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Pages /
            <Link to="/dashboard">
              <h1 className={`text-[16px] cursor-pointer font-small ml-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`} >Dashboard /</h1>
            </Link>
            <Link to="/dashboard/addwebsite">
              <h1 className={`text-[16px] cursor-pointer font-small ml-1  ${darkMode ? "text-[#fff]" : "text-black"}`} >Add website</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">

            <Link to="/dashboard/addwebsite">
              <button
                className="border-1 border-pink-600  text-pink-600  p-[0.5rem] text-[14px] font-small rounded-md" >
                Add website
              </button>
            </Link>
            <button

              className="border-1 border-blue-600  text-blue-600  p-[0.5rem] text-[14px] font-small rounded-md"
            >
              Check Insights
            </button>

            <IoSettingsOutline
              className={`w-5 h-5 cursor-pointer ${darkMode ? "text-gray-300 hover:text-[#fff]" : " text-gray-600 hover:text-gray-800"}`}
              onClick={() => setIsSettingsOpen(true)}
            />
            <SettingsBar
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              setNavbarFixed={setNavbarFixed}
              navbarFixed={navbarFixed}
              setDarkMode={setDarkMode}
              darkMode={darkMode}
            />
            <NotificationDropdown
              darkMode={darkMode}
            />

            <Logout darkMode={darkMode} />
          </div>
        </header>


        <div className="flex justify-center mt-20 items-center">
          <div className={`w-full max-w-[60%] rounded-lg p-6  ${darkMode
              ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
              : "bg-white border-2 border-gray-200 border-opacity-100 shadow-sm"
              }`}>

            <div
              className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6"
              style={{ backgroundImage: 'linear-gradient(195deg, #313152, #010d21)' }}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
                Add website
              </h2>

            </div>
            <form className="px-0 pt-7" onSubmit={handleSubmit} noValidate>
              {/* Website Name */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className={`block text-sm font-semibold  mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                >
                  Website Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline 
                    ${errors.title
                      ? "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    }
                  `}
                  placeholder="Enter website name"
                />
                {errors.title && (
                  <span className="text-red-500 text-xs mt-2 inline-block">
                    {errors.title}
                  </span>
                )}
              </div>

              {/* URL Input */}
              <div className="mb-4">
                <label
                  htmlFor="url"
                  className={`block text-sm font-semibold  mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                >
                  Website URL
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  value={formData.url}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline 
                    ${errors.url
                      ? "border-red-500 focus:ring-2 focus:ring-red-400"
                      : "border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    }
                  `}
                  placeholder="e.g., https://example.com"
                />
                {errors.url && (
                  <span className="text-red-500 text-xs mt-2 inline-block">
                    {errors.url}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className={`w-[60%] bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${Object.values(errors).some((err) => err)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    style={{ backgroundImage: 'linear-gradient(195deg, #313152, #010d21)' }}
                  disabled={Object.values(errors).some((err) => err) || isLoading}
                >
                  {isLoading ? (
                    <SpinnerLoad size="h-5 w-5" />
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>

  );
};