import React, { useState, useEffect, useRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

const NotificationDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New message from Laura",
      time: "13 minutes ago",
      avatar: "../images/p1.jpg",
      read: false,
    },
    {
      id: 2,
      message: "New comment on your post",
      time: "1 hour ago",
      avatar: "../images/p3.jpg",
      read: false,
    },
    {
      id: 3,
      message: "Your profile was updated",
      time: "3 hours ago",
      avatar: "../images/p4.jpg",
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => {
      if (!prev) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) => ({ ...notif, read: true }))
        );
      }
      return !prev;
    });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="cursor-pointer text-gray-600 relative"
        onClick={toggleDropdown}
      >
        <IoMdNotificationsOutline className="w-5 h-5 text-gray-600 hover:text-gray-800" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 text-[10px] font-semibold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown */}
      <CSSTransition
        in={dropdownOpen}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <ul className="absolute z-50 right-0 mt-4 w-64 bg-white border border-gray-200 rounded-lg py-3 px-2">
          {/* Arrow pointing to the icon */}
          <div className="absolute -top-2 right-2 w-4 h-4 border-t border-l border-gray-200 bg-white transform rotate-45"></div>

          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <li key={notification.id} className="mb-2">
                <a
                  href="#"
                  className="dropdown-item flex items-center p-2 rounded-md hover:bg-gray-100"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="flex items-center">
                    <img
                      src={notification.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex flex-col">
                      <h6 className="text-sm font-semibold">
                        {notification.message}
                      </h6>
                      <p className="text-xs text-gray-500 flex items-center">
                        <FaClock className="mr-1" /> {notification.time}
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center py-2">
              No new notifications
            </li>
          )}
        </ul>
      </CSSTransition>
    </div>
  );
};

export default NotificationDropdown;
