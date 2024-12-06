
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

  // Strict URL validation function
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
      setAlert({ type: "info", message: "Valid website link!" });
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
      // Retrieve the username from sessionStorage
      const username = sessionStorage.getItem('username');

      // Include the username in the request
      const response = await axios.get('/web', {
        params: {
          username: username
        }
      });

      console.log('Fetched data:', response.data);
      setWebs(response.data);
    } catch (error) {
      console.error('Error fetching webs:', error);
    }
  };

  const handleEdit = (element) => {
    console.log(`Edit clicked for element: `, element);

    // Serialize the array element
    let serializedElement = JSON.stringify(element);

    // Redirect with serialized element in query string
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

  return (
    <div className="min-h-screen ml-[15rem] flex bg-gray-100 p-2">
      {/* Sidebar */}

      <SidebarModal />

      {/* Main content */}
      <div className="flex-1 pl-4 pr-2 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div className=" pl-3 flex items-center text-[16px] font-small text-gray-600">
            Pages /
            <Link to="/dashboard">
              <h1 className="text-[16px] cursor-pointer font-small text-black ml-1" >Dashboard</h1>
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
              <button onClick={addRow} className="border-1 border-pink-600 text-pink-600 p-[0.5rem] text-[14px] font-small rounded-md">
                Add website
              </button>
            </Link>

            <button
              className="border-1 border-blue-600 text-blue-600 p-[0.5rem] text-[14px] font-small rounded-md"
              onClick={scrollToInsights}>
              Check Insights
            </button>


            <IoSettingsOutline
              className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-800"
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
        <div className="mb-0 pl-3  text-[1.7rem] text-gray-900 font-bold">Dashboard </div>
        <div className="mb-8 pl-3 text-[1.2rem] text-gray-600 ">Check the websites, speed, users and much more. </div>
        {/* Dashboard Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">

            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-600">Page Speed</div>
                <div className="text-2xl font-bold">53ms</div>
                <div className="text-sm text-gray-500">Load Time</div>
              </div>
              <div className="w-[50px] h-[50px] mb-4 rounded-lg flex justify-center items-center"
                style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}>
                <IoSpeedometerOutline className="w-5 h-5 text-white" />

              </div>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2"></div>
            {/* Visualization Section */}
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Optimization Score</span>
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
          <div className="bg-white border border-gray-200  rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-600">Global Rank</div>
                <div className="text-2xl font-bold">#20,465</div>
              </div>
              <div className="w-[50px] h-[50px] bg-black rounded-lg flex justify-center items-center" style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}>
                <FaRankingStar className="w-5 h-5 text-white " />

              </div>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 "></div>
            <div className="text-gray-600  mt-2">Traffic rank of site, compared to all other sites in the world</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">

            <div className="flex justify-between items-center">
              <div>
                <div className="text-gray-600 ">SEO Performance</div>
                <div className="text-xl font-bold ">{currentPerformance.label}</div>
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

          <div className="bg-white border border-gray-200 rounded-lg p-4 ">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xl font-bold text-gray-800">Uptime Status</div>
              </div>
              <div
                className="w-[50px] h-[50px] bg-black rounded-lg flex justify-center items-center"
                style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}
              >
                <SiInstatus className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 "></div>
            {/* Performance Section */}
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Daily Uptime</span>
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

            <div className="mt-4 text-sm text-gray-600">
              The system maintained excellent uptime performance.
            </div>
          </div>
        </div>

        {/* Graphs */}
        <div className="grid grid-cols-3 gap-6">
          <WebsiteViewsCard />

          <DailySalesCard />

          <TrafficByCountryCard />

        </div>
        {/* Webistes */}
        <div className="flex max-w-[100%] mx-auto mt-6 gap-6">
          <div className="w-full min-h-[450px] bg-white border border-gray-200 rounded-lg p-0">
            <div className="flex justify-between items-center pl-5 py-4 pb-0">
              <h2 className="text-[18px] font-semibold">Websites</h2>
            </div>
            <div className="text-gray-600 pt-2 pb-2">
              <span className="font-bold text-gray-600 pl-5">{webs.length} done</span>
              <span className="ml-1 text-gray-500">this month</span>
            </div>
            <div ref={insightsRef} className="card-body px-0 pb-1">
              <div className="max-h-[340px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
                <table className="w-full text-left table-auto border-separate border-spacing-y-0">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr className="text-gray-500 text-xs font-bold uppercase">
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
                    {webs.map((web, index) => (
                      <tr className="bg-white" key={index}>
                        <td className="px-4 py-3 border-b border-gray-300">
                          <div className="flex items-center">
                            <img src={web.companyImage} alt={web.title} className="w-8 h-8 mr-5 rounded-lg" />
                            <div>
                              <h6 className="text-sm font-semibold text-gray-800">{web.title}</h6>
                            </div>
                          </div>
                        </td>
                        <td className="text-center px-4 py-3 border-b border-gray-300">
                          <a href={web.url} target="_blank" rel="noopener noreferrer">
                            {shortenUrl(web.url)}
                          </a>
                        </td>
                        <td className="text-center px-4 py-3 border-b border-gray-300">{web.seo}</td>
                        <td className="text-center px-4 py-3 border-b border-gray-300">{web.page_speed}</td>
                        <td className="text-center px-4 py-3 border-b border-gray-300">
                          {web.is_active === 1 ? 'active' : 'down'}
                        </td>
                        <td className="text-center px-4 py-3 border-b border-gray-300 text-sm">
                          <div className="mt-2 flex justify-center space-x-2">
                            <button onClick={() => handleEdit(web)} className="text-blue-500 hover:text-blue-700" aria-label="Edit">
                              <FaEdit className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleDelete(web.id)} className="text-red-500 hover:text-red-700" aria-label="Delete">
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
                    ))}
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


