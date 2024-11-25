
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

import NotificationDropdown from "../modal/NotificationDropdown";

import { Link, useNavigate } from 'react-router-dom';

export default function Profile () {
    const [settings, setSettings] = useState([
        {
          id: "email_follow",
          label: "Email me when someone follows me",
          checked: true,
        },
        {
          id: "email_post",
          label: "Email me when someone answers on my post",
          checked: false,
        },
        {
          id: "email_mention",
          label: "Email me when someone mentions me",
          checked: true,
        },
        {
          id: "new_launches",
          label: "Disable/Enable alerts",
          checked: false,
        },
        
      ]);


const conversations = [
  {
    name: "Sophie B.",
    message: "Hi! I need more information..",
    avatar: "./images/p1.jpg",
  },
  {
    name: "Anne Marie",
    message: "Awesome work, can you..",
    avatar: "./images/p3.jpg",
  },
  {
    name: "Ivanna",
    message: "About files I can..",
    avatar: "./images/p4.jpg",
  },
  {
    name: "Peterson",
    message: "Have a great afternoon..",
    avatar: "./images/p2.jpg",
  },
  {
    name: "Nick Daniel",
    message: "Hi! I need more information..",
    avatar: "./images/xd.jpg",
  },
];
    
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
    
  return (
    <div className="min-h-screen flex bg-gray-100 p-2">
    {/* Sidebar */}
    <aside
      className="w-[15rem] bg-white rounded-lg border border-gray-200 p-4 flex flex-col"
      style={{
        position: "sticky",
        top: "0",
      
      }}
    >

    <div className="flex items-center justify-center cursor-pointer">
    <Link to="/dashboard" >
      <img
        src="../images/fluxsight.png"
        alt="fluxsight logo"
        className="w-[9.8rem] h-[3rem] mb-2"
      />
       </Link> 
    </div>
   
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-4"></div>

    <nav className="flex flex-col flex-1 space-y-4">
      <ul className="space-y-2">
        <li
          className="flex items-center p-2 text-[13.5px] font-medium rounded-md bg-gray-900 text-white cursor-pointer"
          style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}
        >
          <span className="mr-2">
            <MdOutlineDashboard className="w-5 h-5" />
          </span>
          Dashboard
        </li>
        <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
          <span className="mr-2">
            <MdOutlineTableView className="w-5 h-5 text-gray-600" />
          </span>
          Tables
        </li>
        <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
          <span className="mr-2">
            <RiBillLine className="w-5 h-5 text-gray-600" />
          </span>
          Billing
        </li>
        
        <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
          <span className="mr-2">
            <MdInsertLink className="w-5 h-5 text-gray-600" />
          </span>
          Websites
        </li>
        <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
          <span className="mr-2">
            <IoMdNotificationsOutline className="w-5 h-5 text-gray-600" />
          </span>
          Alerts
        </li>
      </ul>
      <div className="font-semibold text-[15px] text-gray-500 mt-8 pl-6">
        ACCOUNT PAGES
      </div>
      <ul className="space-y-2">
      <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
          <span className="mr-2">
          <IoSettingsOutline className="w-5 h-5  text-gray-600"/> 
          </span>
          Settings
        </li>
        <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
          <span className="mr-2">
            <FaRegUser className="w-5 h-5 text-gray-600" />
          </span>
          Profile
        </li>
        <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
          <span className="mr-2">
            <SlLogin className="w-5 h-5 text-gray-600" />
          </span>
          Sign In
        </li>
        <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
          <span className="mr-2">
            <SlLogin className="w-5 h-5 text-gray-600" />
          </span>
          Sign Up
        </li>
      </ul>
     
    </nav>
  </aside>

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
          <input
                type="text"
                placeholder="Type here..."
                className="border border-gray-300 p-[0.5rem] text-sm rounded-lg focus:outline-none focus:border-pink-700   focus:ring-1 focus:ring-pink-700 shadow-sm"
                />
                <Link to="/dashboard/addwebsite">
                 <button
                 className="border border-pink-600  text-pink-600  p-[0.5rem] text-[14px] font-small rounded-md" >
                 Add website
              </button>
              </Link>
        
        <button
         className="border border-blue-600  text-blue-600  p-[0.5rem] text-[14px] font-small rounded-md" >
         Check Insights
        </button>
            
                <Link to="/settings">
                 <IoSettingsOutline className="w-5 h-5 cursor-pointer text-gray-600"/> 
                 </Link>

                 <NotificationDropdown />
                
                <Link to="/register">
                <FaRegUserCircle  className="w-5 h-5 cursor-pointer text-gray-600 " />
                </Link>
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
    <img src="./images/p2.jpg" alt="Description of the image" className="w-16 h-16 rounded-lg" />
    <div className="flex flex-col text-sm pl-6">
      <div className="text-2xl font-bold">Richard Davis</div>
      <div className="text-sm text-gray-500">CEO / Co-Founder</div>
    </div>
  </div>


  <div className="flex flex-col">
  <div className="flex bg-gray-100 p-2 rounded-lg">
    <button
      onClick={() => setActiveTab("App")}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-transform duration-300 ease-in-out ${
        activeTab === "App"
          ? "bg-white shadow-md scale-105"
          : "text-gray-500 scale-100"
      } focus:outline-none`}
    >
      <AiOutlineHome className="h-5 w-5" />
      <span className="ml-1">App</span>
    </button>

    <button
      onClick={() => setActiveTab("Messages")}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-transform duration-300 ease-in-out ${
        activeTab === "Messages"
          ? "bg-white shadow-md scale-105"
          : "text-gray-500 scale-100"
      } focus:outline-none`}
    >
      <IoMailOutline className="h-5 w-5" />
      <span className="ml-1">Messages</span>
    </button>

    <button
      onClick={() => setActiveTab("Settings")}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-transform duration-300 ease-in-out ${
        activeTab === "Settings"
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
      <div className="p-4 ">
        <h6 className="text-lg font-medium">Platform Settings</h6>
      </div>
      <div className="p-4">
        <h6 className="uppercase text-gray-500 text-xs font-bold mb-4">Account</h6>
        <ul className="space-y-6">
          {settings
            .filter((setting) => setting.id.includes("email"))
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
                      className={`w-10 h-5 rounded-full transition-colors duration-300 ease-in-out ${
                        setting.checked ? "bg-gray-600" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                        setting.checked ? "transform translate-x-5" : ""
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

        <h6 className="uppercase text-gray-500 text-xs font-bold mt-6 mb-4">Application</h6>
        <ul className="space-y-6">
          {settings
            .filter((setting) => setting.id.includes("launches") || setting.id.includes("product") || setting.id.includes("newsletter")) // Update filter condition
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
                      className={`w-10 h-5 rounded-full transition-colors duration-300 ease-in-out ${
                        setting.checked ? "bg-gray-600" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
                        setting.checked ? "transform translate-x-5" : ""
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
    <div className="w-full xl:w-1/3 bg-white  rounded-lg">
      <div className="p-4  flex justify-between items-center">
        <h6 className="text-lg font-medium">Profile Information</h6>
        <button
          className="text-gray-500 hover:text-gray-700"
          title="Edit Profile"
        >
          <i className="fas fa-user-edit"></i>
        </button>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-700 mb-4">
          Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is
          no. If two equally difficult paths, choose the one more painful in
          the short term (pain avoidance is creating an illusion of equality).
        </p>
       
        <ul className="space-y-4 pt-4">
          <li>
            <strong className="text-gray-900 font-medium">Full Name:</strong> Alec M.
            Thompson
          </li>
          <li>
            <strong className="text-gray-900 font-medium">Mobile:</strong> (44) 123 1234
            123
          </li>
          <li>
            <strong className="text-gray-900 font-medium">Email:</strong>
            <a href="mailto:example@example.com" className="pl-2 text-blue-500">
              example@example.com
            </a>
          </li>
          <li>
            <strong className="text-gray-900 font-medium">Location:</strong> USA
          </li>
          <li className="flex space-x-2">
            <strong className="text-gray-900 font-medium">Social:</strong>
            <a href="#" className="text-blue-600">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-blue-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-pink-500">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="w-full xl:w-1/3 bg-white rounded-lg">
  <div className="p-4 ">
    <h6 className="text-lg font-medium">Conversations</h6>
  </div>
  <div className="p-3">
      <ul className="list-none space-y-4">
        {conversations.map((chat, index) => (
          <li
            key={index}
            className="flex items-center px-0 mb-2 pt-0  pb-4 last:border-none"
          >
            <div className="flex-shrink-0">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-lg shadow"
              />
            </div>
            <div className="flex flex-col justify-center ml-4">
              <h6 className="text-sm font-bold mb-1">{chat.name}</h6>
              <p className="text-xs text-gray-500">{chat.message}</p>
            </div>
            <button className="ml-auto text-pink-500 ">Reply</button>
          </li>
        ))}
      </ul>
    </div>
</div>


</div> 
           
          </div>

  </div>
</div>
        </div>
     
  
  );
};


