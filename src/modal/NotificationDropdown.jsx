import React, { useState, useEffect, useRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";

const NotificationDropdown = () => {
  // State to manage dropdown visibility and notifications
  const [isOpen, setIsOpen] = useState(false);
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

  // Calculate unread notifications count
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const dropdownRef = useRef(null);

  // Toggle dropdown visibility and mark notifications as read
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => {
      if (!prevIsOpen) {
        // Mark all notifications as read when dropdown is opened
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) => ({ ...notif, read: true }))
        );
      }
      return !prevIsOpen;
    });
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Notification Icon with unread count badge */}
      <div
        className="cursor-pointer text-gray-600 relative"
        onClick={toggleDropdown}
      >
        <IoMdNotificationsOutline className="w-5 h-5" />
        {/* Show unread count badge if there are unread notifications */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 text-[10px] font-semibold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown Menu with fade-in/fade-out animation */}
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <ul
          ref={dropdownRef}
          className="absolute right-0 mt-5 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-3 px-2"
        >
          {notifications.map((notification) => (
            <li key={notification.id} className="mb-2">
              <a
                href="#"
                className="dropdown-item flex items-center p-2 rounded-md hover:bg-gray-100"
                onClick={() => {
                  // You can also handle individual read here if you need additional actions
                }}
              >
                <div className="flex items-center">
                  <img
                    src={notification.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex flex-col">
                    <h6 className="text-sm font-semibold">{notification.message}</h6>
                    <p className="text-xs text-gray-500 flex items-center">
                      <FaClock className="mr-1" /> {notification.time}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};

export default NotificationDropdown;