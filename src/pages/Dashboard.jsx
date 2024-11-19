import React from 'react';
import { FaRegStar } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineTableView } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { PiVirtualReality } from "react-icons/pi";
import { MdInsertLink } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { SlLogin } from "react-icons/sl";

import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard  () {
  return (
    <div className="min-h-screen p-2 bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-[15rem] bg-white rounded-lg border border-gray-200  p-4 flex flex-col">
      <div className="flex items-center justify-center cursor-pointer">
      <img src="./images/fluxsight.png" alt="fluxsight logo" className="w-[9.8rem] h-[3rem] mb-2" />
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-4"></div>

        <nav className="flex flex-col space-y-4">
        
          <ul className="space-y-2">
            <li className="flex items-center p-2 text-[13.5px] font-medium  rounded-md bg-gray-900 text-white cursor-pointer" style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}>
              <span className="mr-2 " ><MdOutlineDashboard className="w-5 h-5"  /></span> Dashboard
            </li>
            <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
              <span className="mr-2"><MdOutlineTableView className="w-5 h-5 text-gray-600" /></span> Tables
            </li>
            <li className="flex items-center p-2 text-[13.5px] font-medium  rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
              <span className="mr-2"><RiBillLine className="w-5 h-5 text-gray-600" /></span> Billing
            </li>
            <li className="flex items-center p-2 text-[13.5px] font-medium  rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
              <span className="mr-2"><PiVirtualReality className="w-5 h-5 text-gray-600" /></span> Virtual Reality
            </li>
            <li className="flex items-center p-2 text-[13.5px] font-medium  rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
              <span className="mr-2"><MdInsertLink className="w-5 h-5 text-gray-600" /></span> RTL
            </li>
            <li className="flex items-center p-2 text-[13.5px] font-medium  rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
              <span className="mr-2"><IoMdNotificationsOutline className="w-5 h-5 text-gray-600"/></span> Notifications
            </li>
          </ul>
          <div className="font-semibold  text-[15px] text-gray-500 mt-8 pl-6">ACCOUNT PAGES</div>
          <ul className="space-y-2">
            <li className="flex items-center p-2  text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
              <span className="mr-2"><FaRegUser className="w-5 h-5 text-gray-600" /></span> Profile
            </li>
            <li className="flex items-center p-2  text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
              <span className="mr-2"><SlLogin className="w-5 h-5 text-gray-600" /></span> Sign In
            </li>
            <li className="flex items-center p-2  text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
              <span className="mr-2"><SlLogin className="w-5 h-5 text-gray-600" /></span> Sign Up
            </li>
          </ul>
          <button className="mt-auto p-1.5 border border-gray-400 rounded-md hover:bg-gray-200">
            Documentation
          </button>
          <button className="mt-auto p-1.5 border border-gray-400 rounded-md text-white font-medium  hover:shadow-md" style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}>
           Upgrade to pro
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 pl-4 pr-2 ">
        <header className="flex items-center justify-between mb-8">
        <div className=" pl-3 flex items-center text-[16px] font-small text-gray-600">
            Pages /
            <h1 className="text-[16px] font-small text-black ml-1" >Dashboard</h1> 
        </div>
          
          <div className="flex items-center space-x-4">
          <input
                type="text"
                placeholder="Type here..."
                className="border border-gray-300 p-[0.5rem] text-sm rounded-lg focus:outline-none focus:border-pink-700   focus:ring-1 focus:ring-pink-700 shadow-sm"
                />
            <button className=" border border-pink-600  text-pink-600  p-[0.5rem] text-[14px] font-small rounded-md">Online Builder</button>
            <div className="flex items-center">
            <span className="flex items-center bg-[#ebf0f4] border border-gray-300 pl-[5px] pt-[5px]  pb-[5px] text-sm pr-[5px] rounded-s-[5px]">
                <FaRegStar className="mr-1" /> Star
           </span>
                <span className="flex items-center bg-white border border-gray-300 pl-[5px] pt-[5px] pb-[5px]  text-sm pr-[5px] rounded-r-[5px]">
                    11,044</span>
                </div>
                <Link to="/settings">
                 <IoSettingsOutline className="w-5 h-5 cursor-pointer text-gray-600"/> 
                 </Link>

                <IoMdNotificationsOutline className="w-5 h-5 cursor-pointer text-gray-600"/>
                <Link to="/register">
                <FaRegUserCircle  className="w-5 h-5 cursor-pointer text-gray-600 " />
                </Link>
          </div>
        </header>
      <div className="mb-0 pl-3  text-[1.7rem] text-gray-900 font-bold">Dashboard </div>
       <div className="mb-8 pl-3 text-[1.2rem] text-gray-600 ">Check the sales, value and bounce rate by country. </div>
        {/* Dashboard Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-gray-600">Today's Money</div>
              <div className="text-2xl font-bold">$53k</div>
            </div>
            <div className="w-[50px] h-[50px] bg-black rounded-lg flex justify-center items-center" style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}>
                <FaRegUser className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 "></div>
          <div className="text-green-500 mt-2">+55% than last week</div>
        </div>
          <div className="bg-white border border-gray-200  rounded-lg p-4">
          <div className="flex justify-between items-center">
          <div>
            <div className="text-gray-600">Today's Users</div>
            <div className="text-2xl font-bold">2300</div>
            </div>
            <div className="w-[50px] h-[50px] bg-black rounded-lg flex justify-center items-center" style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}>
               <FaRegUser className="w-5 h-5 text-white" />
            </div>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 "></div>
            <div className="text-green-500  mt-2">+3% than last month</div>
          </div>
          <div className="bg-white border border-gray-200  rounded-lg p-4">
          <div className="flex justify-between items-center">
          <div>
            <div className="text-gray-600">Ads Views</div>
            <div className="text-2xl font-bold">3,462</div>
            </div>
            <div className="w-[50px] h-[50px] bg-black rounded-lg flex justify-center items-center" style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}>
               <FaRegUser className="w-5 h-5 text-white" />
            </div>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 "></div>
            <div className="text-red-500  mt-2">-2% than yesterday</div>
          </div>
          <div className="bg-white border border-gray-200  rounded-lg p-4">
          <div className="flex justify-between items-center">
          <div>
            <div className="text-gray-600">Sales</div>
            <div className="text-2xl font-bold">$103,430</div>
            </div>
            <div className="w-[50px] h-[50px] bg-black rounded-lg flex justify-center items-center" style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}>
                <FaRegUser className="w-5 h-5 text-white" />
            </div>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 "></div>
            <div className="text-green-500  mt-2">+5% than yesterday</div>
          </div>
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="font-semibold">Website Views</h2>
            <p className="text-gray-500 text-sm">Last Campaign Performance</p>
            <div className="mt-4">
              <div className="h-[13rem] bg-gray-200 rounded-md flex items-center justify-center">
                Graph here
              </div>
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-4 "></div>
            </div>
          </div>
          <div className="bg-white border border-gray-200  rounded-lg p-4">
            <h2 className="font-semibold">Daily Sales</h2>
            <p className="text-gray-500 text-sm">(+15%) increase in today sales</p>
            <div className="mt-4">
              <div className="h-[13rem] bg-gray-200 rounded-md flex items-center justify-center">
                Graph here
              </div>
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-4 "></div>
            </div>
          </div>
          <div className="bg-white border border-gray-200  rounded-lg p-4">
            <h2 className="font-semibold">Completed Tasks</h2>
            <p className="text-gray-500 text-sm">Last Campaign Performance</p>
            <div className="mt-4">
              <div className="h-[13rem] bg-gray-200 rounded-md flex items-center justify-center">
                Graph here
              </div>
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-4 "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


