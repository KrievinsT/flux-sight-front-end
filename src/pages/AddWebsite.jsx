
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


import NotificationDropdown from "../modal/NotificationDropdown";



import { Link, useNavigate } from 'react-router-dom';



export default function AddWebsite () {



  return (
    <div className="min-h-screen flex bg-gray-100 p-2">
    {/* Sidebar */}
    <aside
      className="w-[15rem] bg-white rounded-lg border border-gray-200 p-4 flex flex-col"
      style={{
        position: "sticky",
        top: "0",
        height: "100vh", 
      }}
    >

    <div className="flex items-center justify-center cursor-pointer">
      <img
        src="../images/fluxsight.png"
        alt="fluxsight logo"
        className="w-[9.8rem] h-[3rem] mb-2"
      />
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
      <div className="flex-1 pl-4 pr-2 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
        <div className=" pl-3 flex items-center text-[16px] font-small text-gray-600">
            Pages /
            <Link to="/dashboard">
            <h1 className="text-[16px] cursor-pointer font-small text-gray-600 ml-1" >Dashboard /</h1> 
            </Link>
            <Link to="/dashboard/addwebsite">
            <h1 className="text-[16px] cursor-pointer font-small text-black ml-1" >Add website</h1> 
            </Link>
        </div>
          
          <div className="flex items-center space-x-4">
          <input
                type="text"
                placeholder="Type here..."
                className="border border-gray-300 p-[0.5rem] text-sm rounded-lg focus:outline-none focus:border-pink-700   focus:ring-1 focus:ring-pink-700 shadow-sm"
                />
                 <button
          
          className="border border-pink-600  text-pink-600  p-[0.5rem] text-[14px] font-small rounded-md"
        >
          Add website
        </button>
        <button
       
          className="border border-blue-600  text-blue-600  p-[0.5rem] text-[14px] font-small rounded-md"
        >
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
      <div className="mb-0 pl-3  text-[1.7rem] text-gray-900 font-bold">Add website </div>
       <div className="mb-8 pl-3 text-[1.2rem] text-gray-600 ">Add you're website, to watch list. </div>
        {/* Dashboard Cards */}
       
        </div>
      </div>
  
  );
};


