
import React, { useState, useEffect } from "react";

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

import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Profile() {

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [originalUserData, setOriginalUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    name: null,
    username: null,
    email: null,
    phone: null,
  });
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
      setOriginalUserData(initialData); // Set original data here
    }
  }, []);

  const [settings, setSettings] = useState([
    {
      id: "email_send",
      label: "Send email's",
      checked: true,
    },
    {
      id: "sms_send",
      label: "Send sms",
      checked: false,
    },
    {
      id: "alerts",
      label: "Disable/Enable alerts",
      checked: true,
    },
  ]);

  const handleToggleChange = (id) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id
          ? { ...setting, checked: !setting.checked }
          : setting
      )
    );
  };

  

  const [activeTab, setActiveTab] = useState("App");
  const renderContent = () => {
    switch (activeTab) {
      case "App":
        return <div>App Content</div>;
      case "Messages":
        return <div>Messages Content</div>;
      case "Settings":
        return <div>Settings Content</div>;
      default:
        return null;
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const updateUserData = async (updatedData, originalUsername) => {
    console.log('Sending update:', updatedData); // Debugging line
    try {
      const dataToSend = { ...updatedData, originalUsername };
      const response = await axios.put(`/users/${updatedData.id}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`
        }
      });
      console.log('Update successful:', response.data);
  
      const user = response.data.user;
  
      const newUserData = {
        id: user.id || "N/A",
        user: user.name || "Guest User",
        username: user.username || "Unknown",
        email: user.email && user.email !== "null" ? user.email : "Unknown",
        phone: user.phone_number && user.phone_number !== "null" ? user.phone_number : "Unknown"
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
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  
  const handleSaveClick = () => {
    console.log('Original data:', originalUserData);
    console.log('Updated data:', userData);
    if (JSON.stringify(userData) !== JSON.stringify(originalUserData)) {
      console.log('Saving data:', userData);
      updateUserData(userData, originalUserData.username); // Pass original username
      setEditMode(false);
    } else {
      console.log('No changes detected');
    }
  };
  
  return (
    <div className="min-h-screen ml-[15rem] flex bg-gray-100 p-2">
      {/* Sidebar */}

      <SidebarModal />

      {/* Main content */}
      <div className="flex-1 pl-6 pr-4 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div className=" pl-3 flex items-center text-[16px] font-small text-gray-600">
            Pages /
            <Link to="/profile">
              <h1 className="text-[16px] cursor-pointer font-small text-black ml-1" >Profile</h1>
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
              className="w-5 h-5 cursor-pointer text-gray-600"
              onClick={() => setIsSettingsOpen(true)}
            />

            <SettingsBar
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
            />
            <NotificationDropdown />

            <Logout />
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

          <div className="w-full max-w-[98%]  bg-white overflow-hidden rounded-lg shadow-lg p-6 -mt-[80px]" >

            <div className="flex justify-between items-center">
              {/* Left Section */}
              <div className="flex items-center space-x-2">
                <img
                  src="./images/p2.jpg"
                  alt="User avatar"
                  className="w-16 h-16 rounded-lg"
                />
                <div className="flex flex-col pl-6">
                  <div className="text-2xl font-bold">
                    {userData.user || "Guest User"}
                  </div>
                  <div className=" text-gray-500">
                    {userData.username ? `${userData.username}` : "No username available"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex bg-gray-100 p-2 rounded-lg">
                  <button
                    onClick={() => setActiveTab("App")}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-transform duration-300 ease-in-out ${activeTab === "App"
                      ? "bg-white shadow-md scale-105"
                      : "text-gray-500 scale-100"
                      } focus:outline-none`}
                  >
                    <AiOutlineHome className="h-5 w-5" />
                    <span className="ml-1">App</span>
                  </button>

                  {/* <button
                    onClick={() => setActiveTab("Messages")}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-transform duration-300 ease-in-out ${activeTab === "Messages"
                      ? "bg-white shadow-md scale-105"
                      : "text-gray-500 scale-100"
                      } focus:outline-none`}
                  >
                    <IoMailOutline className="h-5 w-5" />
                    <span className="ml-1">Messages</span>
                  </button> */}

                  <button
                    onClick={() => setActiveTab("Settings")}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-transform duration-300 ease-in-out ${activeTab === "Settings"
                      ? "bg-white shadow-md scale-105"
                      : "text-gray-500 scale-100"
                      } focus:outline-none`}
                  >
                    <LuSettings className="h-5 w-5" />
                    <span className="ml-1">Settings</span>
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
              <div className="w-full xl:w-1/3 bg-white rounded-lg">
                <div className="p-2">
                  <h6 className="text-lg font-medium">Platform Settings</h6>
                </div>
                <div className="p-3">
                  {/* Account Section */}
                  <h6 className="uppercase text-gray-500 text-xs font-bold mb-4">
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
                                className={`w-10 h-5 rounded-full transition-colors duration-300 ease-in-out ${setting.checked ? "bg-gray-600" : "bg-gray-400"
                                  }`}
                              />
                              <div
                                className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${setting.checked ? "transform translate-x-5" : ""
                                  }`}
                              />
                            </div>
                            <span className="ml-3 text-sm text-gray-700 font-medium">
                              {setting.label}
                            </span>
                          </label>
                        </li>
                      ))}
                  </ul>

                  {/* Application Section */}
                  <h6 className="uppercase text-gray-500 text-xs font-bold mt-6 mb-4">
                    Application
                  </h6>
                  <ul className="space-y-6">
                    {settings
                      .filter((setting) => setting.id === "alerts")
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
                                className={`w-10 h-5 rounded-full transition-colors duration-300 ease-in-out ${setting.checked ? "bg-gray-600" : "bg-gray-400"
                                  }`}
                              />
                              <div
                                className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${setting.checked ? "transform translate-x-5" : ""
                                  }`}
                              />
                            </div>
                            <span className="ml-3 text-sm text-gray-700 font-medium">
                              {setting.label}
                            </span>
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              {/* Profile Information */}
              <div className="w-full xl:w-1/3 bg-white rounded-lg">
                <div className="p-2 flex justify-between items-center">
                  <h6 className="text-lg font-medium">Profile Information</h6>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    title="Edit Profile"
                    onClick={handleEditClick}
                    style={{ display: 'block', visibility: 'visible' }}
                  >
                    <i className="fas fa-user-edit"></i><FaRegEdit />
                  </button>
                </div>
                <div className="p-3">
                  <ul className="space-y-4">
                    <li>
                      <strong className="text-gray-900 font-medium">Full Name:</strong>
                      {editMode ? (
                        <input
                          type="text"
                          name="user"
                          value={userData.user}
                          onChange={handleInputChange}
                        />
                      ) : (
                        ` ${userData.user}`
                      )}
                    </li>
                    <li>
                      <strong className="text-gray-900 font-medium">Username:</strong>
                      {editMode ? (
                        <input
                          type="text"
                          name="username"
                          value={userData.username}
                          onChange={handleInputChange}
                        />
                      ) : (
                        ` ${userData.username}`
                      )}
                    </li>
                    <li>
                      <strong className="text-gray-900 font-medium">Mobile:</strong>
                      {editMode ? (
                        <input
                          type="text"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                        />
                      ) : (
                        ` ${userData.phone}`
                      )}
                    </li>
                    <li>
                      <strong className="text-gray-900 font-medium">Email:</strong>
                      {editMode ? (
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <a href={`mailto:${userData.email}`} className="pl-2 text-blue-500">
                          {userData.email}
                        </a>
                      )}
                    </li>
                  </ul>
                  {editMode && (
                    <button
                      className="mt-3 text-white bg-blue-500 hover:bg-blue-700 p-2 rounded"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
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


