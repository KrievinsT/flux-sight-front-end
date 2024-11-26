import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineTableView } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

const SidebarModal = () => {
  const location = useLocation(); // Get the current route path

  // Map routes to corresponding active button states
  const getActiveButton = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "dashboard";
      case "/tables":
        return "tables";
      case "/alerts":
        return "notifications";
      case "/profile":
        return "profile";
      default:
        return null;
    }
  };

  const activeButton = getActiveButton(); // Determine which button is active

  return (
    <aside
      className="w-[15rem] bg-white rounded-lg border border-gray-200 p-4 flex flex-col animate-slideInLeft"
      style={{
        position: "fixed",
        top: "7px",
        left: "7px",
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
            <li
              className={`flex items-center p-2 text-[13.5px] font-medium rounded-md cursor-pointer ${
                activeButton === "dashboard"
                  ? "text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundImage:
                  activeButton === "dashboard"
                    ? "linear-gradient(195deg, #42424a, #191919)"
                    : "none",
              }}
            >
              <span
                className="mr-2"
                style={{
                  color: activeButton === "dashboard" ? "white" : "#4b5563",
                }}
              >
                <MdOutlineDashboard className="w-5 h-5" />
              </span>
              Dashboard
            </li>
          </Link>
          <Link to="/tables">
            <li
              className={`flex items-center p-2 text-[13.5px] font-medium rounded-md cursor-pointer ${
                activeButton === "tables"
                  ? "text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundImage:
                  activeButton === "tables"
                    ? "linear-gradient(195deg, #42424a, #191919)"
                    : "none",
              }}
            >
              <span
                className="mr-2"
                style={{
                  color: activeButton === "tables" ? "white" : "#4b5563",
                }}
              >
                <MdOutlineTableView className="w-5 h-5" />
              </span>
              Tables
            </li>
          </Link>
          <Link to="/alerts">
            <li
              className={`flex items-center p-2 text-[13.5px] font-medium rounded-md cursor-pointer ${
                activeButton === "notifications"
                  ? "text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundImage:
                  activeButton === "notifications"
                    ? "linear-gradient(195deg, #42424a, #191919)"
                    : "none",
              }}
            >
              <span
                className="mr-2"
                style={{
                  color: activeButton === "notifications" ? "white" : "#4b5563",
                }}
              >
                <IoMdNotificationsOutline className="w-5 h-5" />
              </span>
              Notifications
            </li>
          </Link>
        </ul>
        <div className="font-semibold text-[15px] text-gray-500 mt-8 pl-6">
          ACCOUNT PAGES
        </div>
        <ul className="space-y-2">
          <Link to="/profile">
            <li
              className={`flex items-center p-2 text-[13.5px] font-medium rounded-md cursor-pointer ${
                activeButton === "profile"
                  ? "text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              style={{
                backgroundImage:
                  activeButton === "profile"
                    ? "linear-gradient(195deg, #42424a, #191919)"
                    : "none",
              }}
            >
              <span
                className="mr-2"
                style={{
                  color: activeButton === "profile" ? "white" : "#4b5563",
                }}
              >
                <FaRegUser className="w-5 h-5" />
              </span>
              Profile
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarModal;
