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
import SidebarModal from "../modal/Sidebar";
import SettingsBar from '../modal/SettingsBar';
import Logout from '../modal/Logout';

import { Link, useNavigate } from 'react-router-dom';

export default function Alerts () {

    const [showBlueAlert, setShowBlueAlert] = useState(true);
    const [showGrayAlert, setShowGrayAlert] = useState(true);
    const [showGreenAlert, setShowGreenAlert] = useState(true);
    const [showRedAlert, setShowRedAlert] = useState(true);
    const [showYellowAlert, setShowYellowAlert] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const [toastType, setToastType] = useState("");

    const [alertHistory, setAlertHistory] = useState([]);

    // Fetch alerts from localStorage on component mount
    useEffect(() => {
      const storedAlerts = JSON.parse(localStorage.getItem("alertHistory")) || [];
      setAlertHistory(storedAlerts);
      console.log("Retrieved Alert History:", storedAlerts);
    }, []);
  
    // Handle removing an alert
    const handleRemoveAlert = (originalIndex) => {
      const updatedAlerts = alertHistory.filter((_, i) => i !== originalIndex);
      setAlertHistory(updatedAlerts);
      localStorage.setItem("alertHistory", JSON.stringify(updatedAlerts));
    };

  const handleShowToast = (type) => {
    setToastType(type);
    const toast = document.getElementById(`${type}Toast`);
    const bootstrapToast = new window.bootstrap.Toast(toast);
    bootstrapToast.show();
  };

  const buttonStyles = {
    success: {
      backgroundImage: "linear-gradient(200deg, #34d399, #10b981)",
      shadow: "0 4px 6px rgba(34,197,94,0.5)",
      hoverShadow: "0 8px 10px rgba(34,197,94,0.7)"
    },
    info: {
      backgroundImage: "linear-gradient(200deg, #60a5fa, #3b82f6)",
      shadow: "0 4px 6px rgba(59,130,246,0.5)",
      hoverShadow: "0 8px 10px rgba(59,130,246,0.7)"
    },
    warning: {
      backgroundImage: "linear-gradient(200deg, #fcd34d, #f59e0b)",
      shadow: "0 4px 6px rgba(234,179,8,0.5)",
      hoverShadow: "0 8px 10px rgba(234,179,8,0.7)"
    },
    danger: {
      backgroundImage: "linear-gradient(200deg, #f87171, #ef4444)",
      shadow: "0 4px 6px rgba(239,68,68,0.5)",
      hoverShadow: "0 8px 10px rgba(239,68,68,0.7)"
    }
  };

  const handleCloseAlert = (alertType) => {
    switch (alertType) {
      case "blue":
        setShowBlueAlert(false);
        break;
      case "gray":
        setShowGrayAlert(false);
        break;
      case "green":
        setShowGreenAlert(false);
        break;
      case "red":
        setShowRedAlert(false);
        break;
      case "yellow":
        setShowYellowAlert(false);
        break;
      default:
        break;
    }
  };

  const handleBubbleEffect = (e) => {
    const button = e.currentTarget;

    const bubble = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    bubble.className = "bubble";

    button.appendChild(bubble);

    bubble.addEventListener("animationend", () => {
      bubble.remove();
    });
  };

  return (
    <div className="min-h-screen ml-[15rem] flex bg-gray-100 p-2">
   
    <SidebarModal />

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

        <div className="container mx-auto md:w-[80%] py-1">
      {/* Alerts Section */}
      <div className="card mt-2 bg-white shadow-lg rounded-lg">
      <div className="card-header bg-white px-6 py-4 bg-gray-100">
        <h5 className="mb-0 text-2xl font-semibold">Status History Alerts</h5>
      </div>
      <div className="card-body px-6 py-4 space-y-4">
        {alertHistory.length === 0 ? (
          <p className="text-gray-500">No alerts to display.</p>
        ) : (
        
          alertHistory
            .slice()
            .reverse()
            .map((alert, index) => {
             
              const originalIndex = alertHistory.length - 1 - index;

              return (
                <div
                key={originalIndex}
                style={{
                  backgroundImage:
                    alert.type === "success"
                      ? "linear-gradient(200deg, #34d399, #10b981)"
                      : alert.type === "info"
                      ? "linear-gradient(200deg, #60a5fa, #3b82f6)"
                      : alert.type === "warning"
                      ? "linear-gradient(200deg, #fcd34d, #f59e0b)"
                      : "linear-gradient(200deg, #f87171, #ef4444)",
                  boxShadow:
                    alert.type === "success"
                      ? "0 4px 6px rgba(34,197,94,0.5)"
                      : alert.type === "info"
                      ? "0 4px 6px rgba(59,130,246,0.5)"
                      : alert.type === "warning"
                      ? "0 4px 6px rgba(234,179,8,0.5)"
                      : "0 4px 6px rgba(239,68,68,0.5)",
                  transition: "box-shadow 0.3s ease",  
                }}
                className="relative px-4 py-3 rounded-lg text-white"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    alert.type === "success"
                      ? "0 8px 10px rgba(34,197,94,0.7)"
                      : alert.type === "info"
                      ? "0 8px 10px rgba(59,130,246,0.7)"
                      : alert.type === "warning"
                      ? "0 8px 10px rgba(234,179,8,0.7)"
                      : "0 8px 10px rgba(239,68,68,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    alert.type === "success"
                      ? "0 4px 6px rgba(34,197,94,0.5)"
                      : alert.type === "info"
                      ? "0 4px 6px rgba(59,130,246,0.5)"
                      : alert.type === "warning"
                      ? "0 4px 6px rgba(234,179,8,0.5)"
                      : "0 4px 6px rgba(239,68,68,0.5)";
                }}
              >
                  <span className="text-sm">
                    <strong className="font-bold text-[16px]  uppercase">
                      {alert.title}:
                    </strong>{" "}
                    {alert.message}
                  </span>
                  <small className="block mt-1 font-medium text-[13px] text-white">
                    {alert.timestamp}
                  </small>
                  <button
                    className="absolute top-[1.2rem] right-2.5 text-3xl"
                    aria-label="Close"
                    onClick={() => handleRemoveAlert(originalIndex)}
                  >
                    &times;
                  </button>
                </div>
              );
            })
        )}
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
      onClick={(e) => {
        handleBubbleEffect(e);
        handleShowToast("success");
      }}
      className="font-medium text-white px-4 py-2 rounded-lg transition-shadow relative overflow-hidden"
      style={{
        backgroundImage: buttonStyles.success.backgroundImage,
        boxShadow: buttonStyles.success.shadow,
      }}
    >
      Success
    </button>
    <button
      onClick={(e) => {
        handleBubbleEffect(e);
        handleShowToast("info");
      }}
      className="font-medium text-white px-4 py-2 rounded-lg transition-shadow relative overflow-hidden"
      style={{
        backgroundImage: buttonStyles.info.backgroundImage,
        boxShadow: buttonStyles.info.shadow,
      }}
    >
      Info
    </button>
    <button
      onClick={(e) => {
        handleBubbleEffect(e);
        handleShowToast("warning");
      }}
      className="font-medium text-white px-4 py-2 rounded-lg transition-shadow relative overflow-hidden"
      style={{
        backgroundImage: buttonStyles.warning.backgroundImage,
        boxShadow: buttonStyles.warning.shadow,
      }}
    >
      Warning
    </button>
    <button
      onClick={(e) => {
        handleBubbleEffect(e);
        handleShowToast("danger");
      }}
      className="font-medium text-white px-4 py-2 rounded-lg transition-shadow relative overflow-hidden"
      style={{
        backgroundImage: buttonStyles.danger.backgroundImage,
        boxShadow: buttonStyles.danger.shadow,
      }}
    >
     Error
    </button>
  </div>
</div>
    </div>

            <div className="position-fixed bottom-3 end-1 z-50">
        {/* Success Toast */}
        <div
            className="toast fade p-2"
            role="alert"
            id="successToast"
            aria-live="assertive"
            aria-atomic="true"
            style={{
            backgroundImage: "linear-gradient(200deg, #34d399, #10b981)",
            boxShadow: "0 4px 6px rgba(34,197,94,0.5)"
            }}
        >
            <div className="toast-header" style={{ backgroundImage: "linear-gradient(200deg, #34d399, #10b981)" }}>
            <FaCheck className="material-symbols-rounded text-white me-2 h-4 w-4" />
            <span className="me-auto text-white font-medium">Success</span>
            <small className="text-white font-medium">11 mins ago</small>
            <button
                type="button"
                className="btn-close text-white btn-close-white ms-3"
                data-bs-dismiss="toast"
                aria-label="Close"
            ></button>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-1"></div>
            <div className="toast-body font-medium text-white">
            Hello, world! This is a notification message.
            </div>
        </div>

        {/* Info Toast */}
        <div
            className="toast fade p-2 mt-2"
            role="alert"
            id="infoToast"
            aria-live="assertive"
            aria-atomic="true"
            style={{
            backgroundImage: "linear-gradient(200deg, #60a5fa, #3b82f6)",
            boxShadow: "0 4px 6px rgba(59,130,246,0.5)"
            }}
        >
            <div className="toast-header" style={{ backgroundImage: "linear-gradient(200deg, #60a5fa, #3b82f6)" }}>
            <HiOutlineBell className="material-symbols-rounded text-white me-2 h-4 w-4" />
            <span className="me-auto text-white font-medium">Info</span>
            <small className="text-white font-medium">11 mins ago</small>
            <button
                type="button"
                className="btn-close text-white btn-close-white ms-3"
                data-bs-dismiss="toast"
                aria-label="Close"
            ></button>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-1"></div>
            <div className="toast-body font-medium text-white">
            Hello, world! This is a notification message.
            </div>
        </div>

        {/* Warning Toast */}
        <div
            className="toast fade p-2 mt-2"
            role="alert"
            id="warningToast"
            aria-live="assertive"
            aria-atomic="true"
            style={{
            backgroundImage: "linear-gradient(200deg, #fcd34d, #f59e0b)",
            boxShadow: "0 4px 6px rgba(234,179,8,0.5)"
            }}
        >
            <div className="toast-header" style={{ backgroundImage: "linear-gradient(200deg, #fcd34d, #f59e0b)" }}>
            <TbWorldSearch className="material-symbols-rounded text-white text-warning me-2 h-4 w-4" />
            <span className="me-auto text-white font-medium">Warning</span>
            <small className="text-white font-medium">11 mins ago</small>
            <button
                type="button"
                className="btn-close text-white btn-close-white ms-3"
                data-bs-dismiss="toast"
                aria-label="Close"
            ></button>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-1"></div>
            <div className="toast-body font-medium text-white">
            Hello, world! This is a notification message.
            </div>
        </div>

        {/* Danger Toast */}
        <div
            className="toast fade p-2 mt-2"
            role="alert"
            id="dangerToast"
            aria-live="assertive"
            aria-atomic="true"
            style={{
            backgroundImage: "linear-gradient(200deg, #f87171, #ef4444)",
            boxShadow: "0 4px 6px rgba(239,68,68,0.5)"
            }}
        >
            <div className="toast-header" style={{ backgroundImage: "linear-gradient(200deg, #f87171, #ef4444)" }}>
            <IoMdMegaphone className="material-symbols-rounded text-white me-2 h-4 w-4" />
            <span className="me-auto text-white font-medium">Error</span>
            <small className="text-white font-medium">11 mins ago</small>
            <button
                type="button"
                className="btn-close text-white btn-close-white ms-3"
                data-bs-dismiss="toast"
                aria-label="Close"
            ></button>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-1"></div>
            <div className="toast-body font-medium text-white">
            Hello, world! This is a notification message.
            </div>
        </div>
        </div>

    </div>

       
        </div>
      </div>
  
  );
};




