
import React, { useState, useEffect, useRef } from "react";

import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineTableView } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { MdInsertLink } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { SlLogin } from "react-icons/sl";
import { AiOutlineHome } from "react-icons/ai";
import { IoMailOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";

import NotificationDropdown from "../modal/NotificationDropdown";
import SidebarModal from "../modal/Sidebar";
import SettingsBar from '../modal/SettingsBar';
import Logout from '../modal/Logout';
import ShowAlerts from '../modal/ShowAlerts';

import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import DOMPurify from "dompurify";

const useDebouncedCallback = (callback, delay) => {
  const timer = useRef(null);

  return (...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default function Profile() {
  const [userDetailsMessages, setUserDetailsMessages] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [originalUserData, setOriginalUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    user: null,
    username: null,
    email: null,
    phone: null,
  });

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [settings, setSettings] = useState([
    {
      id: "email_send",
      label: "Send email's",
      checked: false,
    },
    {
      id: "sms_send",
      label: "Send sms",
      checked: false,
    },
    {
      id: "alerts_send",
      label: "Disable/Enable alerts",
      checked: true,
    },
  ]);

  const updateNotificationState = useRef(null);


  const validateForm = () => {
    const sanitizedUser = DOMPurify.sanitize(userData.user.trim());
    const sanitizedUsername = DOMPurify.sanitize(userData.username.trim());
    const sanitizedPhone = DOMPurify.sanitize(userData.phone.trim());
    const sanitizedEmail = DOMPurify.sanitize(userData.email.trim());

    if (!/^[a-zA-Z\s]{3,}$/.test(sanitizedUser)) {
      setAlert({ type: "danger", message: "Name must be at least 3 characters long." });
      return false;
    }
    if (!/^[a-zA-Z\s]{2,}$/.test(sanitizedUsername)) {
      setAlert({ type: "danger", message: "Username must be at least 2 characters long." });
      return false;
    }
    if (!/^\d{7,15}$/.test(sanitizedPhone)) {
      setAlert({
        type: "danger",
        message: "Phone number must contain only digits and be between 7 and 15 characters long.",
      });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      setAlert({ type: "danger", message: "Please enter a valid email address." });
      return false;
    }

    setAlert({ type: "success", message: "Profile updated successfully!" });
    return true;
  };


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Failed to fetch country data.");
        const data = await response.json();

        const formattedCountries = data
          .map((country) => ({
            name: country.name.common,
            code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
            flag: country.flags.svg,
          }))
          .filter((country) => country.code);

        setCountries(formattedCountries);
        setSelectedCountry(formattedCountries[0]);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const user = localStorage.getItem("user") || sessionStorage.getItem("user");
    const username = localStorage.getItem("username") || sessionStorage.getItem("username");
    const email = localStorage.getItem("email") || sessionStorage.getItem("email");
    const phone = localStorage.getItem("phone") || sessionStorage.getItem("phone");

    console.log("Retrieved Data:");
    console.log("Token:", token);
    console.log("ID:", id);
    console.log("User:", user);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Phone:", phone);

    if (token && id) {
      const initialData = {
        id: id || "N/A",
        user: user || "Guest User",
        username: username || "Unknown",
        email: email && email !== "null" ? email : "Unknown",
        phone: phone && phone !== "null" ? phone : "Unknown",
      };
      setUserData(initialData);
      setOriginalUserData(initialData);
    }
  }, []);

  const handleToggleChange = (id) => {
    console.log(`Toggling setting with id: ${id}`);
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id ? { ...setting, checked: !setting.checked } : setting
      )
    );

    const updatedSetting = settings.find((setting) => setting.id === id);
    console.log(`Updated setting state:`, updatedSetting);
    debounceUpdateNotificationState(id, !updatedSetting.checked);
  };

  const updateNotificationStateFn = async (id, newState) => {
    const userId = sessionStorage.getItem('id'); // Retrieve user ID from session storage
    console.log(`User ID from sessionStorage: ${userId}`);

    if (!userId) {
      console.error('User ID not found in session storage');
      return;
    }

    const body = {
      user_id: userId,
      sendSMS: id === 'sms_send' ? newState : settings.find(setting => setting.id === 'sms_send').checked,
      sendEmail: id === 'email_send' ? newState : settings.find(setting => setting.id === 'email_send').checked,
      sendAlerts: id === 'alerts_send' ? newState : settings.find(setting => setting.id === 'alerts_send').checked, // New field added
    };

    console.log(`Sending request to update notification state with body:`, body);

    try {
      const response = await axios.put('/user/notifications', body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API response:', response.data);
    } catch (error) {
      console.error('Error updating notification state', error);
    }
  };

  // Create debounced version of updateNotificationState
  const debounceUpdateNotificationState = useDebouncedCallback((...args) => {
    if (updateNotificationState.current) {
      updateNotificationState.current(...args);
    }
  }, 300);

  useEffect(() => {

    updateNotificationState.current = updateNotificationStateFn;

    const fetchSettings = async () => {
      const userId = sessionStorage.getItem('id');
      if (!userId) {
        console.error('User ID not found in session storage');
        return;
      }

      try {
        const response = await axios.get('/user/notifications', {
          params: { user_id: userId },
        });
        const { sendSMS, sendEmail, sendAlerts } = response.data; // Include sendAlerts
        setSettings((prevSettings) =>
          prevSettings.map((setting) => {
            if (setting.id === 'sms_send') return { ...setting, checked: sendSMS };
            if (setting.id === 'email_send') return { ...setting, checked: sendEmail };
            if (setting.id === 'alerts_send') return { ...setting, checked: sendAlerts }; // Ensure sendAlerts is handled
            return setting;
          })
        );
      } catch (error) {
        console.error('Error fetching notification settings', error);
      }
    };

    fetchSettings();
  }, []);


  const [activeTab, setActiveTab] = useState("App");
  const renderContent = () => {
    switch (activeTab) {
      case "App":
        return <div>App Content</div>;
      case "Settings":
        return <div>Settings Content</div>;
      default:
        return null;
    }
  };

  const handleSettingsClick = () => {
    setActiveTab("Settings");
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearUserDetailsMessages = () => {
    for (let i = 0; ; i++) {
      if (sessionStorage.getItem(`userDetailsMessage${i}`)) {
        sessionStorage.removeItem(`userDetailsMessage${i}`);
      } else {
        break;
      }
    }
    sessionStorage.removeItem('userDetailsMessage');
    setUserDetailsMessages([]);
  };

  const updateUserData = async (updatedData, originalUsername) => {
    console.log('Sending update:', updatedData); // Debugging line
    try {
      const dataToSend = { ...updatedData, originalUsername };
      const response = await axios.put(`/users/${updatedData.id}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`,
        },
      });
      console.log('Update successful:', response.data);

      const user = response.data.user;

      const newUserData = {
        id: user.id || "N/A",
        user: user.name || "Guest User",
        username: user.username || "Unknown",
        email: user.email && user.email !== "null" ? user.email : "Unknown",
        phone: user.phone_number && user.phone_number !== "null" ? user.phone_number : "Unknown",
      };
      setUserData(newUserData);

      sessionStorage.setItem("id", newUserData.id);
      sessionStorage.setItem("user", newUserData.user);
      sessionStorage.setItem("username", newUserData.username);
      sessionStorage.setItem("email", newUserData.email);
      sessionStorage.setItem("phone", newUserData.phone);

      if (localStorage.getItem("token")) {
        localStorage.setItem("id", newUserData.id);
        localStorage.setItem("user", newUserData.user);
        localStorage.setItem("username", newUserData.username);
        localStorage.setItem("email", newUserData.email);
        localStorage.setItem("phone", newUserData.phone);
      }

      clearUserDetailsMessages();

    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };


  const handleSaveClick = () => {

    if (!validateForm()) {
      return;
    }

    console.log('Original data:', originalUserData);
    console.log('Updated data:', userData);

    const updatedData = {
      ...userData,
      phone: `${selectedCountry?.code || ""}${userData.phone || ""}`,
    };

    // Only save if there are changes
    if (JSON.stringify(updatedData) !== JSON.stringify(originalUserData)) {
      console.log('Saving data:', updatedData);

      updateUserData(updatedData, originalUserData.username)
        .then(() => {
          setEditMode(false);
          setActiveTab("App");
          setAlert({ type: "success", message: "Profile updated successfully!" });
        })
        .catch((error) => {
          console.error('Error saving data:', error);
          setAlert({ type: "danger", message: "An error occurred while saving your data. Please try again." });
        });
    } else {
      console.log('No changes detected');
      setAlert({ type: "info", message: "No changes detected. Please make updates before saving." });
    }
  };


  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

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
            <Link to="/profile">
              <h1 className={`text-[16px] cursor-pointer font-small ml-1 ${darkMode ? "text-[#fff]" : "text-black"}`} >Profile</h1>
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
              className="border-1 border-blue-600  text-blue-600  p-[0.5rem] text-[14px] font-small rounded-md" >
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

        <div className="relative flex flex-col items-center">
          <div
            className="w-full max-w-full h-[300px] min-h-[300px] bg-cover overflow-hidden rounded-lg shadow-lg"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("./images/profile-back.jpg")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          ></div>

          <div className={`w-full max-w-[98%] overflow-hidden rounded-lg p-6 -mt-[80px] ${darkMode
            ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
            : "bg-white border-1 border-gray-200 border-opacity-100 shadow-lg"
            }`}>

            <div className="flex justify-between items-center">
              {/* Left Section */}
              <div className="flex items-center space-x-2">
                <img
                  src="./images/p2.jpg"
                  alt="User avatar"
                  className="w-16 h-16 rounded-lg"
                />
                <div className="flex flex-col pl-6">
                  <div className={`text-2xl font-bold ${darkMode ? "text-[#fff]" : ""}`}>
                    {userData.user || "Guest User"}
                  </div>
                  <div className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                    {userData.username ? `${userData.username}` : "No username available"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className={`flex p-2 rounded-lg ${darkMode
                  ? "bg-gradient-to-br from-[#323a54] to-[#1a2035]"
                  : "bg-gray-100"
                  }`}>
                 <button
                      onClick={() => {
                        setActiveTab("App");
                        setEditMode(false);
                      }}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-transform duration-300 ease-in-out ${activeTab === "App"
                        ? `bg-white shadow-md scale-105 ${darkMode ? "text-black" : "text-gray-800"}`
                        : `${darkMode ? "text-[#fff]" : "text-gray-500"} scale-100`
                        } focus:outline-none`}
                    >
                      <AiOutlineHome
                        className={`h-5 w-5 ${activeTab === "App" && darkMode ? "text-black" : darkMode ? "text-[#fff]" : ""}`}
                      />
                      <span
                        className={`ml-1 ${activeTab === "App" && darkMode ? "text-black" : darkMode ? "text-[#fff]" : ""}`}
                      >
                        App
                      </span>
                    </button>

                    <button
                      onClick={handleSettingsClick}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-transform duration-300 ease-in-out ${activeTab === "Settings"
                        ? `bg-white shadow-md scale-105 ${darkMode ? "text-black" : "text-gray-800"}`
                        : `${darkMode ? "text-[#fff]" : "text-gray-500"} scale-100`
                        } focus:outline-none`}
                    >
                      <LuSettings
                        className={`h-5 w-5 ${activeTab === "Settings" && darkMode ? "text-black" : darkMode ? "text-[#fff]" : ""}`}
                      />
                      <span
                        className={`ml-1 ${activeTab === "Settings" && darkMode ? "text-black" : darkMode ? "text-[#fff]" : ""}`}
                      >
                        Settings
                      </span>
                    </button>
                </div>

                <div className="relative w-full overflow-hidden mt-4">
                  <div
                    className={`absolute w-full transition-transform duration-300 ease-in-out`}
                    style={{
                      transform:
                        activeTab === "App"
                          ? "translateX(0%)"
                          : activeTab === "Messages"
                            ? "translateX(-100%)"
                            : "translateX(-200%)",
                    }}
                  >
                    <div className="w-full">
                      <div className={`p-4 bg-white rounded-lg shadow-lg`}>
                        {renderContent()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-6 pt-6">
              {/* Platform Settings */}
              <div className={`w-full xl:w-1/3 rounded-lg ${darkMode
                ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
                : "bg-white border-1 border-gray-200 border-opacity-100 shadow-lg"
                }`}>
                <div className="p-2">
                  <h6 className={`text-lg font-medium ${darkMode ? "text-[#fff]" : ""}`}>Platform Settings</h6>
                </div>
                <div className="p-3">
                  {/* Account Section */}
                  <h6 className={`uppercase  text-xs font-bold mb-4 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                    Account
                  </h6>
                  <ul className="space-y-6">
                    {settings
                      .filter((setting) => setting.id === "email_send" || setting.id === "sms_send")
                      .map((setting) => (
                        <li key={setting.id} className="flex items-center">
                          <label
                            htmlFor={setting.id}
                            className="inline-flex items-center cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              id={setting.id}
                              className="hidden"
                              checked={setting.checked}
                              onChange={() => handleToggleChange(setting.id)}
                            />
                            <div className="relative">
                              <div
                                className={`w-10 h-5 rounded-full transition-colors duration-300 ease-in-out ${setting.checked ? "bg-gray-600" : "bg-gray-400"}`}
                              />
                              <div
                                className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${setting.checked ? "transform translate-x-5" : ""}`}
                              />
                            </div>
                            <span className={`ml-3 text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                              {setting.label}
                            </span>
                          </label>
                        </li>
                      ))}
                  </ul>

                  {/* Application Section */}
                  <h6 className={`uppercase text-xs font-bold mt-6 mb-4 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                    Application
                  </h6>
                  <ul className="space-y-6">
                    {settings
                      .filter((setting) => setting.id === "alerts_send")
                      .map((setting) => (
                        <li key={setting.id} className="flex items-center">
                          <label
                            htmlFor={setting.id}
                            className="inline-flex items-center cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              id={setting.id}
                              className="hidden"
                              checked={setting.checked}
                              onChange={() => handleToggleChange(setting.id)}
                            />
                            <div className="relative">
                              <div
                                className={`w-10 h-5 rounded-full transition-colors duration-300 ease-in-out ${setting.checked ? "bg-gray-600" : "bg-gray-400"}`}
                              />
                              <div
                                className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${setting.checked ? "transform translate-x-5" : ""}`}
                              />
                            </div>
                            <span className={`ml-3 text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
                              {setting.label}
                            </span>
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Profile Information */}
              <div className={`w-full xl:w-1/3 rounded-lg ${darkMode
                ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
                : "bg-white border-1 border-gray-200 border-opacity-100 shadow-lg"
                }`}>
                <div className="p-2 flex justify-between items-center">
                  <h6 className={`text-lg font-medium ${darkMode ? "text-[#fff]" : ""}`}>Profile Information</h6>
                  {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    title="Edit Profile"
                    onClick={handleSettingsClick}
                    style={{ display: 'block', visibility: 'visible' }}
                  >
                  </button>
                </div>
                <div className="p-3">
                  {alert.message && <ShowAlerts type={alert.type} message={alert.message} />}
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <strong className={`font-medium w-1/3 ${darkMode ? "text-[#fff]" : "text-gray-900"}`}>Full Name:</strong>
                      {editMode ? (
                        <input
                          type="text"
                          name="user"
                          value={userData.user}
                          onChange={(e) => {
                            const formattedValue = e.target.value
                              .toLowerCase()
                              .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
                            handleInputChange({
                              target: { name: "user", value: formattedValue },
                            });
                          }}
                          className="w-full ml-2 p-1 pl-3 border-2 border-gray-300 rounded-lg focus:outline-none 
                              focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400
                              transition-all duration-200 "
                        />
                      ) : (
                        <span
                          className={`${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {userData.user}
                        </span>
                      )}
                    </li>
                    <li className="flex items-center">
                      <strong className={`font-medium w-1/3 ${darkMode ? "text-[#fff]" : "text-gray-900"}`}>Username:</strong>
                      {editMode ? (
                        <input
                          type="text"
                          name="username"
                          value={userData.username}
                          onChange={(e) => {
                            const formattedValue = e.target.value
                              .replace(/\s+/g, "")
                              .replace(/^\w/, (match) => match.toUpperCase());
                            handleInputChange({
                              target: { name: "username", value: formattedValue },
                            });
                          }}
                          className="w-full ml-2 p-1 pl-3 border-2 border-gray-300 rounded-lg focus:outline-none 
                              focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400
                              transition-all duration-200"
                        />
                      ) : (
                        <span
                          className={`${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {userData.username}
                        </span>
                      )}
                    </li>
                    <li className="flex items-center ">
                      <strong className={`font-medium w-1/3 ${darkMode ? "text-[#fff]" : "text-gray-900"}`}>Mobile:</strong>
                      {editMode ? (
                        <div className="flex w-full items-center gap-3">
                          {/* Dropdown for Country Code */}
                          <div className="relative w-[70%] ">
                            <button
                              className="flex items-center bg-white justify-between w-full ml-2 p-1 pl-3 border-2 border-gray-300 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400
              transition-all duration-200 "
                              onClick={(e) => {
                                e.preventDefault();
                                setDropdownOpen(!dropdownOpen);
                              }}
                              type="button"
                            >
                              <span className="flex items-center">
                                {selectedCountry?.flag && (
                                  <img
                                    src={selectedCountry.flag}
                                    alt={selectedCountry.name}
                                    className="w-5 h-5 mr-2 rounded"
                                  />
                                )}
                                {selectedCountry?.code || "Code"}
                              </span>
                              <span className="text-gray-600">&#9660;</span>
                            </button>
                            {dropdownOpen && countries?.length > 0 && (
                              <div
                                className="absolute ml-2 z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-[9rem] overflow-y-auto"
                                role="listbox"
                              >
                                <ul>
                                  {countries
                                    ?.sort((a, b) => a.name.localeCompare(b.name))
                                    .map((country) => (
                                      <li
                                        key={country.code}
                                        className="px-2 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                        role="option"
                                        onClick={() => {
                                          setSelectedCountry(country);
                                          setDropdownOpen(false);
                                        }}
                                      >
                                        <span className="flex items-center">
                                          {country?.flag && (
                                            <img
                                              src={country.flag}
                                              alt={country.name}
                                              className="w-5 h-5 mr-2 rounded"
                                            />
                                          )}
                                          {country.name}
                                        </span>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          {/* Phone Input */}
                          <input
                            type="text"
                            name="phone"
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className="w-2/3 ml-2 p-1 pl-3 border-2 border-gray-300 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400
              transition-all duration-200"
                          />
                        </div>
                      ) : (
                        <span
                          className={`${darkMode ? "text-gray-300" : "text-gray-900"}`}>
                          {userData.phone}
                        </span>
                      )}
                    </li>
                    <li className="flex items-center">
                      <strong className={`font-medium w-1/3 ${darkMode ? "text-[#fff]" : "text-gray-900"}`}>Email:</strong>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          className="w-full ml-2 p-1 pl-3 border-2 border-gray-300 rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400
                transition-all duration-200"
                        />
                      ) : (
                        <a
                          href="https://mail.google.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" text-blue-600 underline"
                        >
                          {userData.email || "unknown@example.com"}
                        </a>
                      )}
                    </li>
                  </ul>
                  {editMode && (
                    <div className="flex items-center justify-center">
                      <button
                        className="text-white mt-3 shadow-lg shadow-black bg-gradient-to-r from-cyan-500 to-blue-500
                        hover:bg-gradient-to-bl hover:shadow-xl hover:shadow-black
                        focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 
                        font-medium rounded-lg text-md px-3 py-2 text-center me-2  
                        transition-all duration-200"
                        onClick={handleSaveClick}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>

              </div>


            </div>
          </div>
        </div>
      </div>
    </div>


  );
};


