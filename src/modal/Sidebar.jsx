import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineTableView } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

const SidebarModal = ({ darkMode }) => {
  const [sidebarColor, setSidebarColor] = useState("blue");
  const [sidebarType, setSidebarType] = useState("White"); 
  const location = useLocation();

  useEffect(() => {
    const updateSidebarType = () => {
      const savedType = localStorage.getItem("sidebarType");
      if (savedType) {
        setSidebarType(savedType); 
      }
    };

    const updateColor = () => {
      const savedColor = localStorage.getItem("sidebarColor");
      if (savedColor) {
        setSidebarColor(savedColor); 
      }
    };

    updateSidebarType();
    updateColor();

    window.addEventListener("storage", () => {
      updateSidebarType(); 
      updateColor();
    });

    return () => {
      window.removeEventListener("storage", () => {
        updateSidebarType();
        updateColor();
      });
    };
  }, []); 

  const getActiveButton = () => {
    if (location.pathname.startsWith("/dashboard")) {
      return "dashboard";
    } else if (location.pathname.startsWith("/tables")) {
      return "tables";
    } else if (location.pathname.startsWith("/alerts")) {
      return "notifications";
    } else if (location.pathname.startsWith("/profile")) {
      return "profile";
    } else {
      return null;
    }
  };

  const activeButton = getActiveButton();

  const activeButtonStyle = {
    backgroundImage: activeButton ? `linear-gradient(195deg, ${sidebarColor}, #191919)` : "none",
  };

  const activeTextStyle = {
    color: activeButton ? "white" : "#4b5563",
  };

  const sidebarBackgroundStyle = {
    backgroundColor: sidebarType === "Dark" ? "#1D1D1D" : sidebarType === "Transparent" ? "transparent" : "#fff",
  };

  const hoverStyle = sidebarType === "Dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";

  return (
    <aside
      className={`w-[15rem] rounded-lg p-4 flex flex-col animate-slideInLeft ${darkMode
        ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
        : "border-1 border-gray-200 border-opacity-100 shadow-sm"
      }`}
      style={{
        ...sidebarBackgroundStyle,
        position: "fixed",
        top: "7px",
        left: "7px",
        height: "98vh",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <Link to="/dashboard">
        <div
          className={`flex items-center justify-between mb-4 ${sidebarType === "Dark" ? "text-white" : ""}`}
        >
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
              className={`flex items-center p-2 text-[13.5px] font-medium rounded-md cursor-pointer  ${
                activeButton === "dashboard" || sidebarType === "Dark"
                  ? "text-white" 
                  : "text-gray-700"
              } ${sidebarType === "Dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
              style={activeButton === "dashboard" ? activeButtonStyle : {}}
            >
              <span
                className="mr-2"
                style={activeButton === "dashboard" ? activeTextStyle : {}}
              >
                <MdOutlineDashboard className="w-5 h-5" />
              </span>
              Dashboard
            </li>
          </Link>
          <Link to="/tables">
            <li
              className={`flex items-center p-2 text-[13.5px] font-medium rounded-md cursor-pointer ${
                activeButton === "tables" || sidebarType === "Dark"
                  ? "text-white" 
                  : "text-gray-700"
              } ${sidebarType === "Dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
              style={activeButton === "tables" ? activeButtonStyle : {}}
            >
              <span
                className="mr-2"
                style={activeButton === "tables" ? activeTextStyle : {}}
              >
                <MdOutlineTableView className="w-5 h-5" />
              </span>
              Tables
            </li>
          </Link>
          <Link to="/alerts">
            <li
              className={`flex items-center p-2 text-[13.5px] font-medium rounded-md cursor-pointer ${
                activeButton === "notifications" || sidebarType === "Dark"
                  ? "text-white" 
                  : "text-gray-700"
              } ${sidebarType === "Dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
              style={activeButton === "notifications" ? activeButtonStyle : {}}
            >
              <span
                className="mr-2"
                style={activeButton === "notifications" ? activeTextStyle : {}}
              >
                <IoMdNotificationsOutline className="w-5 h-5" />
              </span>
              Notifications
            </li>
          </Link>
        </ul>
        <div className={`font-semibold text-[15px] mt-8 pl-6 ${sidebarType === "Dark" ? "text-white" : "text-gray-500"}`}>
          ACCOUNT PAGES
        </div>
        <ul className="space-y-2">
          <Link to="/profile">
            <li
              className={`flex items-center p-2 text-[13.5px] font-medium rounded-md cursor-pointer ${
                activeButton === "profile" || sidebarType === "Dark"
                  ? "text-white" 
                  : "text-gray-700"
              } ${sidebarType === "Dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
              style={activeButton === "profile" ? activeButtonStyle : {}}
            >
              <span
                className="mr-2"
                style={activeButton === "profile" ? activeTextStyle : {}}
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
