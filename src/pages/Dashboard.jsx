
import React, { useState, useEffect, useRef } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

import { IoSpeedometerOutline } from "react-icons/io5";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { SiInstatus } from "react-icons/si";
import { FaRankingStar } from "react-icons/fa6";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import NotificationDropdown from "../modal/NotificationDropdown";
import Logout from '../modal/Logout';
import WebsiteViewsCard from "../modal/WebsiteViewsCard";
import DailySalesCard from "../modal/DailySalesCard";
import TrafficByCountryCard from "../modal/TrafficByCountryCard";
import SidebarModal from "../modal/Sidebar";
import SettingsBar from '../modal/SettingsBar';
import ShowAlerts from '../modal/ShowAlerts';

import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';


const seoPerformance = [
  { label: 'Good', color: 'green', icon: <FaCheckCircle />, description: 'Optimized SEO for all key pages.' },
  { label: 'Needs Improvement', color: 'orange', icon: <FaExclamationTriangle />, description: 'Some elements are missing metadata.' },
  { label: 'Poor', color: 'red', icon: <FaTimesCircle />, description: 'Critical SEO issues detected.' },
];

const status = 'Poor';
const currentPerformance = seoPerformance.find((perf) => perf.label === status);

export default function Dashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const insightsRef = useRef(null);
  const [webs, setWebs] = useState([]);
  const [records, setRecords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [userDetailsMessage, setUserDetailsMessages] = useState('');



  const validateURL = (url) => {
    const urlPattern = new RegExp(
      /^(https?:\/\/(?:www\.)?|www\.)[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/g
    );
    return urlPattern.test(url);
  };

  const checkUserDetails = async (id) => {
    try {
      const response = await axios.post('/notifications', { id });

      if (response.data.messages) {
        // Store each message with its own key in sessionStorage
        response.data.messages.forEach((message, index) => {
          sessionStorage.setItem(`userDetailsMessage${index}`, message);
        });
        setUserDetailsMessages(response.data.messages);
      } else {
        sessionStorage.setItem('userDetailsMessage', response.data.message);
        setUserDetailsMessages([response.data.message]);
      }
    } catch (error) {
      console.error('Error checking user details:', error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    // Retrieve user ID from sessionStorage
    const userId = sessionStorage.getItem('id');

    if (userId) {
      checkUserDetails(userId);
    } else {
      console.error('User ID not found in sessionStorage');
    }
  }, []);

  const userDetailsMessages = [];
  for (let i = 0; ; i++) {
    const message = sessionStorage.getItem(`userDetailsMessage${i}`);
    if (message) {
      userDetailsMessages.push(message);
    } else {
      break;
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);

    if (value.length === 0) {
      setIsValid(null);
      setAlert({ type: "", message: "" });
    } else if (validateURL(value)) {
      setIsValid(true);
      setAlert({ type: "success", message: "Valid website link!" });
    } else {
      setIsValid(false);
      setAlert({ type: "danger", message: "Invalid website link. Please enter a valid URL." });
    }
  };

  // Automatically clear the alert after 3 seconds
  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ type: "", message: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const scrollToInsights = () => {

    if (insightsRef.current) {
      insightsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [rows, setRows] = useState([
    {
      companyName: "Material XD Version",
      companyImage: "./images/xd.jpg",
      url: "https://material.com",
      completion: "60%",
      completionWidth: "60%",
    },
    {
      companyName: "Add Progress Track",
      companyImage: "./images/test2.jfif",
      url: "https://addprogresstrack.com",
      completion: "10%",
      completionWidth: "10%",
    },
    {
      companyName: "Fix Platform Errors",
      companyImage: "./images/test3.jpg",
      url: "https://fixplatform.com",
      completion: "100%",
      completionWidth: "100%",
    },
  ]);

  const addRow = () => {
    const newRow = {
      companyName: "New Company",
      companyImage: "./images/new.jpg",
      members: ["./images/p1.jpg"],
      url: "https://heroicons.com",
      completion: "20%",
      completionWidth: "20%",
    };
    setRows([...rows, newRow]);
  };

  useEffect(() => {
    fetchWebs();
  }, []);

  const fetchWebs = async () => {
    try {

      const username = sessionStorage.getItem("username");

      if (!username) {
        console.error("Username is not found in sessionStorage.");
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/getValidData/${username}.json`);

      if (response.status !== 200) {
        throw new Error(`Failed to fetch data: Status ${response.status}`);
      }

      const data = response.data;
      console.log("Fetched data:", data);

      setWebs(data);
    } catch (error) {
      console.error("Error fetching webs:", error.message);
    }
  };

  const handleEdit = (element) => {
    console.log(`Edit clicked for element: `, element);

    // Create a new object with only the required properties
    const { id, url, title, username } = element;
    const serializedElement = JSON.stringify({ id, url, title, username });

    window.location.href = `/dashboard/editwebsite?data=${encodeURIComponent(serializedElement)}`;
  };


  const handleDelete = async (id) => {
    console.log(`Delete clicked for id: ${id}`);

    try {
      const response = await axios.delete(`/delete-record/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data.message);

      // Update state to remove the deleted record
      setWebs(prevWebs => prevWebs.filter(web => web.id !== id));
    } catch (error) {
      console.error('There was a problem with the deletion operation:', error);
    }
  };


  const shortenUrl = (url) => {
    if (url.length > 20) {
      return url.slice(0, 20) + '...';
    }
    return url;
  };

  const [navbarFixed, setNavbarFixed] = useState(() => {
    return JSON.parse(localStorage.getItem('navbarFixed')) || false;
  });

  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });


  useEffect(() => {
    document.body.style.backgroundColor = darkMode
      ? "rgb(23,23,23)"
      : "rgb(243,244,246)";
  }, [darkMode]);

  useEffect(() => {
    const storedNavbarFixed = JSON.parse(localStorage.getItem('navbarFixed'));
    setNavbarFixed(storedNavbarFixed);  // Sync with localStorage on component load
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    setDarkMode(storedDarkMode);
  }, []);



  return (
    <div
      className={`min-h-screen ml-[15rem] flex p-2`}
    >
      {/* Sidebar */}

      <SidebarModal darkMode={darkMode} />

      {/* Main content */}
      <div className={`flex-1 pl-4 pr-2 overflow-y-auto ${navbarFixed ? "mt-[5.7%]" : ""}`}>

        <header
          className={`flex items-center justify-between mb-8 ${navbarFixed ? "fixed top-0 ml-[15rem] rounded-lg p-2 left-4 right-0 z-50 bg-white shadow-md" : ""
            }`}
        >
          <div className={`pl-3 flex items-center text-[16px] font-small ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Pages /
            <Link to="/dashboard">
              <h1 className={`text-[16px] cursor-pointer font-small ml-1 ${darkMode ? "text-[#fff]" : "text-black"}`} >Dashboard</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type website link here..."
              className={`border-2 border-gray-300 p-[0.5rem] text-sm rounded-lg focus:outline-none focus:border-pink-700
                ${isValid === false ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-pink-700"}`}
            />

            {/* Show Alerts based on validation */}
            {alert.message && <ShowAlerts type={alert.type} message={alert.message} />}

            {/* https://preline.co */}

            <Link to="/dashboard/addwebsite">
              <button onClick={addRow} className={`border-1 p-[0.5rem] text-[14px] font-small rounded-md 
              ${darkMode ? "border-pink-600 text-pink-600" : "border-pink-600 text-pink-600"}`}>
                Add website
              </button>
            </Link>

            <button
              className={`border-1 p-[0.5rem] text-[14px] font-small rounded-md
              ${darkMode ? "border-blue-600 text-blue-600" : "border-blue-600 text-blue-600"}`}
              onClick={scrollToInsights}>
              Check Insights
            </button>


            <IoSettingsOutline
              className={`w-5 h-5 cursor-pointer ${darkMode ? "text-gray-300 hover:text-[#fff]" : " text-gray-600 hover:text-gray-800"}`}
              onClick={() => setIsSettingsOpen(true)}
            />

            <SettingsBar
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              setNavbarFixed={setNavbarFixed} // Pass setNavbarFixed
              navbarFixed={navbarFixed} // Pass navbarFixed state
              setDarkMode={setDarkMode} // Pass setDarkMode
              darkMode={darkMode} // Pass darkMode state
            />


            <NotificationDropdown
              darkMode={darkMode}
            />

            <Logout darkMode={darkMode} />

          </div>

        </header>



        <div className={`mb-0 pl-3  text-[1.7rem] font-bold ${darkMode ? "text-[#fff]" : "text-gray-900"}`}>Dashboard </div>
        <div className={`mb-8 pl-3 text-[1.2rem]  ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Check the websites, speed, users and much more. </div>
        {/* Dashboard Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">

          <div
            className={`rounded-lg p-4 ${darkMode
              ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
              : "bg-white border-2 border-gray-200 border-opacity-100 shadow-sm"
              }`}>
            <div className="flex justify-between items-center">
              <div>
                <div className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Page Speed</div>
                <div className={`text-2xl font-bold ${darkMode ? "text-[#fff]" : ""}`}>53ms</div>
                <div className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Load Time</div>
              </div>
              <div
                className={`w-[50px] h-[50px] mb-4 rounded-lg flex justify-center items-center ${darkMode
                  ? "bg-gradient-to-br from-[#323a54] to-[#1a2035]"
                  : "bg-gradient-to-br from-[#42424a] to-[#191919]"
                  }`}
              >
                <IoSpeedometerOutline className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2"></div>
            {/* Visualization Section */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Optimization Score</span>
                <span className="font-bold text-green-500">92%</span> {/* values from your backend or APIs */}
              </div>
              <div className="relative h-2 w-full bg-gray-200 rounded-lg overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500"
                  style={{ width: '92%' }} //  values from your backend or APIs 
                ></div>
              </div>
              <div className="text-green-500 mt-4 ">+55% improvement compared to last week</div> {/* values from your backend or APIs */}
            </div>
          </div>

          <div
            className={`rounded-lg p-4 ${darkMode
              ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
              : "bg-white border-2 border-gray-200 border-opacity-100 shadow-sm"
              }`}>
            <div className="flex justify-between items-center">
              <div>
                <div className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Global Rank</div>
                <div className={`text-2xl font-bold ${darkMode ? "text-[#fff]" : ""}`}>#20,465</div>
              </div>
              <div
                className={`w-[50px] h-[50px] mb-4 rounded-lg flex justify-center items-center ${darkMode
                  ? "bg-gradient-to-br from-[#323a54] to-[#1a2035]"
                  : "bg-gradient-to-br from-[#42424a] to-[#191919]"
                  }`}
              >
                <FaRankingStar className="w-5 h-5 text-white " />

              </div>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 "></div>
            <div className={`mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Traffic rank of site, compared to all other sites in the world</div>
          </div>

          <div
            className={`rounded-lg p-4 ${darkMode
              ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
              : "bg-white border-2 border-gray-200 border-opacity-100 shadow-sm"
              }`}>
            <div className="flex justify-between items-center">
              <div>
                <div className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>SEO Performance</div>
                <div className={`text-2xl font-bold ${darkMode ? "text-[#fff]" : ""}`}>{currentPerformance.label}</div>
              </div>
              <div
                className={`w-[50px] h-[50px]  rounded-lg flex justify-center items-center`}
                style={{ backgroundColor: currentPerformance.color }}
              >
                <div className="text-white text-2xl" >{currentPerformance.icon}</div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2"></div>

            <div className="mt-4" style={{ color: currentPerformance.color }}>{currentPerformance.description}</div>
          </div>

          <div
            className={`rounded-lg p-4 ${darkMode
              ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
              : "bg-white border-2 border-gray-200 border-opacity-100 shadow-sm"
              }`}>
            <div className="flex justify-between items-center">
              <div>
                <div className={`text-2xl font-bold ${darkMode ? "text-[#fff]" : ""}`}>Uptime Status</div>
              </div>
              <div
                className={`w-[50px] h-[50px] mb-4 rounded-lg flex justify-center items-center ${darkMode
                  ? "bg-gradient-to-br from-[#323a54] to-[#1a2035]"
                  : "bg-gradient-to-br from-[#42424a] to-[#191919]"
                  }`}
              >
                <SiInstatus className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 "></div>
            {/* Performance Section */}
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Daily Uptime</span>
                <span className="font-bold text-green-500">99%</span>
              </div>
              <div className="relative h-2 w-full bg-gray-200 rounded-lg overflow-hidden mt-1">
                <div
                  className="absolute top-0 left-0 h-full bg-green-500"
                  style={{ width: '99%' }}
                ></div>
              </div>
              <div className="text-green-500 mt-2">+5% than yesterday</div>
            </div>

            <div className={`mt-4 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              The system maintained excellent uptime performance.
            </div>
          </div>
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-3 gap-6">
          <WebsiteViewsCard darkMode={darkMode} />
          <DailySalesCard darkMode={darkMode} />
          <TrafficByCountryCard darkMode={darkMode} />

        </div>
        {/* Webistes */}
        <div className="flex max-w-[100%] mx-auto mt-6 gap-6">
          <div className={`w-full min-h-[450px] rounded-lg  ${darkMode
            ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
            : "bg-white border-2 border-gray-200 border-opacity-100 shadow-sm"
            }`}>
            <div className="flex justify-between items-center pl-5 py-4 pb-0">
              <h2 className={`text-[18px] font-semibold  ${darkMode ? "text-[#fff]" : ""}`}>Websites</h2>
            </div>
            <div className="pt-2 pb-2">
              <span className={`font-bold pl-5  ${darkMode ? "text-[#fff]" : "text-gray-600"}`}>{webs.length} done</span>
              <span className={`ml-1 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>this month</span>
            </div>
            <div ref={insightsRef} className="card-body px-0 pb-1 ">
              <div className="max-h-[340px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
                <table className="w-full text-left table-auto border-separate border-spacing-y-0">
                  <thead className={`sticky top-0 z-10  ${darkMode
                    ? "bg-gradient-to-br from-[#323a54] to-[#1a2035]"
                    : "bg-gray-100"
                    }`}>
                    <tr className={`text-xs font-bold uppercase  ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                      <th className="py-2 pl-5">Title</th>
                      <th className="py-2 text-center w-1/4">URL</th>
                      <th className="py-2 text-center w-1/6">SEO</th>
                      <th className="py-2 text-center w-1/6">Page Speed</th>
                      <th className="py-2 text-center w-1/6">Activity</th>
                      <th className="py-2 text-center w-1/6">CRUD</th>
                      <th className="py-2 text-center w-1/6">Insight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {webs.length > 0 ? (
                      webs.map((web, index) => (
                        <tr className={` ${darkMode ? "bg-[#1D1D1D]" : "bg-white"}`} key={index}>
                          <td className="px-4 py-3 border-b border-gray-300">
                            <div className="flex items-center">
                              <img
                                src={`https://www.google.com/s2/favicons?sz=64&domain_url=${web.url}`}
                                alt={`${web.title} favicon`}
                                onError={(e) => (e.target.src = "/default-icon.png")}
                                className="w-8 h-8 mr-5 rounded-lg"
                              />
                              <div>
                                <h6 className={`text-sm font-semibold ${darkMode ? "text-[#fff]" : "text-gray-800"}`}>
                                  {web.title}
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td className={`text-center px-4 py-3 border-b border-gray-300 ${darkMode ? "text-[#fff]" : "text-gray-800"}`}>
                            <a href={web.url} target="_blank" rel="noopener noreferrer">
                              {shortenUrl(web.url)}
                            </a>
                          </td>
                          <td className="text-center px-4 py-3 border-b border-gray-300">
                            <div className="relative w-[6rem] h-[3.5rem] mx-auto">
                              <svg width="64" height="32" viewBox="0 0 64 32" className="w-full h-full">
                                <path
                                  d="M2 30 A30 30 0 0 1 62 30"
                                  fill="none"
                                  stroke="#e5e5e5"
                                  strokeWidth="4"
                                />
                                <path
                                  d="M2 30 A30 30 0 0 1 62 30"
                                  fill="none"
                                  stroke="#3b82f6"
                                  strokeWidth="4"
                                  strokeDasharray={`${web.seo * 1.88}, 188`}
                                />
                              </svg>
                              <span className="absolute inset-0 flex items-end justify-center text-xs font-bold text-green-600 pb-2">
                                Coming soon!
                              </span>
                            </div>
                          </td>
                          <td className="text-center px-4 py-3 border-b border-gray-300">
                            <div className="relative w-[6rem] h-[3.5rem] mx-auto">
                              <svg width="64" height="32" viewBox="0 0 64 32" className="w-full h-full">
                                <path
                                  d="M2 30 A30 30 0 0 1 62 30"
                                  fill="none"
                                  stroke="#e5e5e5"
                                  strokeWidth="4"
                                />
                                <path
                                  d="M2 30 A30 30 0 0 1 62 30"
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="4"
                                  strokeDasharray={`${web.page_speed * 1.88}, 188`}
                                />
                              </svg>
                              <span className={`absolute inset-0 flex items-end justify-center text-xs font-bold pb-2
                                ${darkMode ? "text-[#fff]" : "text-gray-800"}`}>
                                {web.data.desktop["bootup-time"].displayValue}
                              </span>
                            </div>
                          </td>
                          <td className="text-center px-4 py-3 border-b border-gray-300">
                            <span
                              className={`px-2 py-1 rounded-md text-white font-semibold transition-all duration-300 ease-in-out ${web.is_active === 1 ? "bg-green-500" : "bg-red-500"}`}>
                              {web.is_active === 1 ? "active" : "down"}
                            </span>
                          </td>
                          <td className="text-center px-4 py-3 border-b border-gray-300 text-sm">
                            <div className="mt-2 flex justify-center space-x-2">
                              <button
                                onClick={() => handleEdit(web)}
                                className="text-blue-500 hover:text-blue-700"
                                aria-label="Edit"
                              >
                                <FaEdit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(web.id)}
                                className="text-red-500 hover:text-red-700"
                                aria-label="Delete"
                              >
                                <FaTrashAlt className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                          <td className="text-center px-4 py-3 border-b border-gray-300 text-sm">
                            <div className="mt-2 flex justify-center">
                              <button className="border-1 border-blue-600 text-blue-600 p-[0.5rem] text-[14px] whitespace-nowrap font-small rounded-md">
                                Check Insights
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-gray-500">
                          No entries found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


