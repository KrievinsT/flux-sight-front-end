import React, { useEffect, useState, useRef } from "react";
import { FaCheck } from 'react-icons/fa';
import { IoMdMegaphone } from 'react-icons/io';
import { HiOutlineBell } from "react-icons/hi";
import { TbWorldSearch } from "react-icons/tb";
import { FaClock } from "react-icons/fa";




export default function ShowAlerts({ type, message }) {
  const [visible, setVisible] = useState(false);
  const isAlertSavedRef = useRef(false); 
  const alertTypes = {
    success: {
      id: "successToast",
      icon: <FaCheck className="material-symbols-rounded text-white me-2 h-4 w-4" />,
      bgColor: "linear-gradient(200deg, #34d399, #10b981)",
      title: "Success",
      boxShadow: "0 4px 6px rgba(34,197,94,0.5)",
    },
    info: {
      id: "infoToast",
      icon: <HiOutlineBell className="material-symbols-rounded text-white me-2 h-4 w-4" />,
      bgColor: "linear-gradient(200deg, #60a5fa, #3b82f6)",
      title: "Info",
      boxShadow: "0 4px 6px rgba(59,130,246,0.5)",
    },
    warning: {
      id: "warningToast",
      icon: <TbWorldSearch className="material-symbols-rounded text-white text-warning me-2 h-4 w-4" />,
      bgColor: "linear-gradient(200deg, #fcd34d, #f59e0b)",
      title: "Warning",
      boxShadow: "0 4px 6px rgba(234,179,8,0.5)",
    },
    danger: {
      id: "dangerToast",
      icon: <IoMdMegaphone className="material-symbols-rounded text-white me-2 h-4 w-4" />,
      bgColor: "linear-gradient(200deg, #f87171, #ef4444)",
      title: "Error",
      boxShadow: "0 4px 6px rgba(239,68,68,0.5)",
    },
  };

  const alert = alertTypes[type];

  useEffect(() => {
    if (alert && message && !isAlertSavedRef.current) {
      const alertData = {
        type,
        message,
        title: alert.title,
        bgColor: alert.bgColor,
        timestamp: new Date().toLocaleString(),
      };

      
      const existingAlerts = JSON.parse(localStorage.getItem("alertHistory")) || [];
      existingAlerts.push(alertData);

      localStorage.setItem("alertHistory", JSON.stringify(existingAlerts));

      // Console log 
      console.log("New Alert Saved:", alertData);
      console.log("Updated Alert History:", existingAlerts);

      setVisible(true);
      isAlertSavedRef.current = true; 

      const timer = setTimeout(() => {
        setVisible(false);
        isAlertSavedRef.current = false;
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [alert, message]);

  if (!alert || !message) return null;

  return (
    <div
      className={`position-fixed bottom-3 end-1 z-50 transition-all duration-500 ease-in-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div
        className="toast show p-2 rounded-lg"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        id={alert.id}
        style={{
          backgroundImage: alert.bgColor,
          boxShadow: alert.boxShadow,
        }}
      >
     
        <div
          className="toast-header flex items-center"
          style={{
            backgroundImage: alert.bgColor,
            color: "white",
          }}
        >
          {alert.icon}
          <span className="me-auto text-white font-medium">{alert.title}</span>
          <small className="text-white font-medium flex items-center">
            <FaClock className="mr-1" />
            Just now!
          </small>
          <button
            type="button"
            className="btn-close text-white btn-close-white ms-3"
            aria-label="Close"
            onClick={() => setVisible(false)}
            style={{ filter: "invert(1)" }} 
          ></button>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 mb-1"></div>
        <div className="toast-body font-medium text-white">{message}</div>
      </div>
    </div>
  );
}
