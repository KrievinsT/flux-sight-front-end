
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
import { FaCheck } from "react-icons/fa6";
import { HiOutlineBell } from "react-icons/hi";
import { TbWorldSearch } from "react-icons/tb";
import { IoMdMegaphone } from "react-icons/io";

import NotificationDropdown from "../modal/NotificationDropdown";

import { Link, useNavigate } from 'react-router-dom';




export default function Alerts () {


    const [toastType, setToastType] = useState("");

  const handleShowToast = (type) => {
    setToastType(type);
    const toast = document.getElementById(`${type}Toast`);
    const bootstrapToast = new window.bootstrap.Toast(toast);
    bootstrapToast.show();
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
      <div className="flex-1 pl-4 pr-2 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
        <div className=" pl-3 flex items-center text-[16px] font-small text-gray-600">
            Pages /
            <Link to="/alerts">
            <h1 className="text-[16px] cursor-pointer font-small text-black ml-1" >Alerts</h1> 
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

        <div className="container mx-auto md:w-[80%] py-1">
      {/* Alerts Section */}
      <div className="card mt-2 bg-white shadow-lg rounded-lg">
        <div className="card-header bg-white px-6 py-4 bg-gray-100 ">
          <h5 className="mb-0 text-2xl font-semibold">Alerts</h5>
        </div>
        <div className="card-body px-6 py-4 space-y-4">
          <div className="bg-blue-500 text-white px-4 py-3 rounded-lg relative">
            <span className="text-sm">
              A simple primary alert with{" "}
              <a href="#" className="underline text-white">
                an example link
              </a>
              . Give it a click if you like.
            </span>
            <button
              className="absolute top-2.5 right-2.5 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="bg-gray-500 text-white px-4 py-3 rounded-lg relative">
            <span className="text-sm">
              A simple secondary alert with{" "}
              <a href="#" className="underline text-white">
                an example link
              </a>
              . Give it a click if you like.
            </span>
            <button
              className="absolute top-2.5 right-2.5 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg relative">
            <span className="text-sm">
              A simple success alert with{" "}
              <a href="#" className="underline text-white">
                an example link
              </a>
              . Give it a click if you like.
            </span>
            <button
              className="absolute top-2.5 right-2.5 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="bg-red-500 text-white px-4 py-3 rounded-lg relative">
            <span className="text-sm">
              A simple danger alert with{" "}
              <a href="#" className="underline text-white">
                an example link
              </a>
              . Give it a click if you like.
            </span>
            <button
              className="absolute top-2.5 right-2.5 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="bg-yellow-500 text-white px-4 py-3 rounded-lg relative">
            <span className="text-sm">
              A simple warning alert with{" "}
              <a href="#" className="underline text-white">
                an example link
              </a>
              . Give it a click if you like.
            </span>
            <button
              className="absolute top-2.5 right-2.5 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="card mt-6 bg-white shadow-lg rounded-lg">
        <div className="card-header bg-white px-6 py-4 bg-gray-100 border-b">
          <h5 className="mb-0 text-2xl font-semibold">Notifications</h5>
          <p className="text-sm">
            Notifications on this page use Toasts. Read more details{" "}
            <a
              href="https://getbootstrap.com/docs/5.0/components/toasts/"
              target="_blank"
              className="underline text-blue-600"
            >
              here
            </a>
            .
          </p>
        </div>
        <div className="card-body px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
                onClick={() => handleShowToast("success")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-[0_4px_6px_rgba(34,197,94,0.5)] hover:shadow-[0_6px_8px_rgba(34,197,94,0.7)] transition-shadow"
            >
                Success
            </button>
            <button
                onClick={() => handleShowToast("info")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-[0_4px_6px_rgba(59,130,246,0.5)] hover:shadow-[0_6px_8px_rgba(59,130,246,0.7)] transition-shadow"
            >
                Info
            </button>
            <button
                onClick={() => handleShowToast("warning")}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-[0_4px_6px_rgba(234,179,8,0.5)] hover:shadow-[0_6px_8px_rgba(234,179,8,0.7)] transition-shadow"
            >
                Warning
            </button>
            <button
                onClick={() => handleShowToast("danger")}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-[0_4px_6px_rgba(239,68,68,0.5)] hover:shadow-[0_6px_8px_rgba(239,68,68,0.7)] transition-shadow"
            >
                Danger
            </button>
          </div>
      </div>
    </div>

    <div className="position-fixed bottom-3 end-1 z-50">
  {/* Success Toast */}
  <div
    className="toast fade p-2 bg-green-500"
    role="alert"
    id="successToast"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className="toast-header bg-green-500 text-white border-0">
      <FaCheck className="material-symbols-rounded text-white me-2 h-4 w-4" />
      <span className="me-auto text-white font-medium">Success</span>
      <small className="text-white">11 mins ago</small>
      <button
        type="button"
        className="btn-close text-white btn-close-white ms-3"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-1"></div>
    <div className="toast-body text-white">
      Hello, world! This is a notification message.
    </div>
  </div>

  {/* Info Toast */}
  <div
    className="toast fade p-2 mt-2 bg-blue-500 text-white"
    role="alert"
    id="infoToast"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className="toast-header bg-blue-500 border-0">
      <HiOutlineBell className="material-symbols-rounded text-white me-2 h-4 w-4" />
      <span className="me-auto text-white font-medium">Info</span>
      <small className="text-white">11 mins ago</small>
      <button
        type="button"
        className="btn-close text-white btn-close-white ms-3"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-1"></div>
    <div className="toast-body text-white">
      Hello, world! This is a notification message.
    </div>
  </div>
  
  {/* Warning Toast */}
  <div
    className="toast fade p-2 mt-2 bg-yellow-500"
    role="alert"
    id="warningToast"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className="toast-header bg-yellow-500 border-0">
      <TbWorldSearch className="material-symbols-rounded text-white text-warning me-2 h-4 w-4" />
      <span className="me-auto text-white font-medium">Warning</span>
      <small className="text-white">11 mins ago</small>
      <button
        type="button"
        className="btn-close text-white btn-close-white ms-3"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-1"></div>
    <div className="toast-body text-white">
      Hello, world! This is a notification message.
    </div>
  </div>

  {/* Danger Toast */}
  <div
    className="toast fade p-2 mt-2 bg-red-500"
    role="alert"
    id="dangerToast"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div className="toast-header bg-red-500 border-0">
      <IoMdMegaphone className="material-symbols-rounded text-white me-2 h-4 w-4" />
      <span className="me-auto text-white font-medium"> Danger</span>
      <small className="text-white">11 mins ago</small>
      <button
        type="button"
        className="btn-close text-white btn-close-white ms-3"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
   
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-1"></div>
    <div className="toast-body text-white">
      Hello, world! This is a notification message.
    </div>
  </div>
</div>
    </div>

       
        </div>
      </div>
  
  );
};




