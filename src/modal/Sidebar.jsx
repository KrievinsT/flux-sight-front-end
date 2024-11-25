import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdOutlineTableView,
  MdInsertLink,
} from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { SlLogin } from "react-icons/sl";

const SidebarModal = () => {


  return (
           <aside
                className="w-[15rem] bg-white rounded-lg border border-gray-200 p-4 flex flex-col animate-slideInLeft"
                style={{
                position: "fixed", 
                top: "7px",
                left: " 7px",
                height: "98vh", 
                overflowY: "auto", 
                zIndex: 1000, 
                }}
            >
         <Link to="/dashboard">
            <div className="flex items-center justify-between mb-4">
            <img
                src="/images/fluxsight.png" 
                alt="fluxsight logo"
                className="w-[9.8rem] h-[3rem]"
                />
        
            </div>
            </Link>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-4"></div>
            <nav className="flex flex-col flex-1 space-y-4">
              <ul className="space-y-2">
              <Link to="/dashboard">
                <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md bg-gray-900 text-white cursor-pointer"
                 style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}>
                  <span className="mr-2">
                    <MdOutlineDashboard className="w-5 h-5" />
                  </span>
                  Dashboard
                </li>
                </Link>
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
                <Link to="/alerts">
                  <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
                    <span className="mr-2">
                      <IoMdNotificationsOutline className="w-5 h-5 text-gray-600" />
                    </span>
                    Alerts
                  </li>
                </Link>
              </ul>
              <div className="font-semibold text-[15px] text-gray-500 mt-8 pl-6">
                ACCOUNT PAGES
              </div>
              <ul className="space-y-2">
                <Link to="/profile">
                  <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
                    <span className="mr-2">
                      <FaRegUser className="w-5 h-5 text-gray-600" />
                    </span>
                    Profile
                  </li>
                </Link>
                <Link to="/login">
                <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
                  <span className="mr-2">
                    <SlLogin className="w-5 h-5 text-gray-600" />
                  </span>
                  Sign In
                </li>
                </Link>
                <Link to="/register">
                <li className="flex items-center p-2 text-[13.5px] font-medium rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer">
                  <span className="mr-2">
                    <SlLogin className="w-5 h-5 text-gray-600" />
                  </span>
                  Sign Up
                </li>
                </Link>
              </ul>
            </nav>
          </aside>

  );
};

export default SidebarModal;
