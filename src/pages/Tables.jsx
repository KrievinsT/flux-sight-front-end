
import React, { useState, useEffect } from "react";

import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

import { FaCheck } from "react-icons/fa6";
import { HiOutlineBell } from "react-icons/hi";
import { TbWorldSearch } from "react-icons/tb";
import { IoMdMegaphone } from "react-icons/io";

import NotificationDropdown from "../modal/NotificationDropdown";
import SidebarModal from "../modal/Sidebar";

import { Link, useNavigate } from 'react-router-dom';




export default function Tables () {


  return (
    <div className="min-h-screen ml-[15rem] flex bg-gray-100 p-2">
    {/* Sidebar */}
    <SidebarModal />

      {/* Main content */}
      <div className="flex-1 pl-4 pr-2 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
        <div className=" pl-3 flex items-center text-[16px] font-small text-gray-600">
            Pages /
            <Link to="/tables">
            <h1 className="text-[16px] cursor-pointer font-small text-black ml-1" >Tables</h1> 
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
            
                <Link to="/settings">
                 <IoSettingsOutline className="w-5 h-5 cursor-pointer text-gray-600"/> 
                 </Link>

                 <NotificationDropdown />
                
                <Link to="/register">
                <FaRegUserCircle  className="w-5 h-5 cursor-pointer text-gray-600 " />
                </Link>
          </div>
        </header>

      

       
        </div>
      </div>
  
  );
};




