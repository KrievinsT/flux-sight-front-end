
import React, { useState, useEffect } from "react";
import { FaRegStar } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineTableView } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { PiVirtualReality } from "react-icons/pi";
import { MdInsertLink } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { SlLogin } from "react-icons/sl";
import { FaRegBell } from "react-icons/fa";
import { IoCode } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa";
import { BsFillKeyFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { SiInstatus } from "react-icons/si";
import { FaRankingStar } from "react-icons/fa6";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import NotificationDropdown from "../modal/NotificationDropdown";
import WebsiteViewsCard from "../modal/WebsiteViewsCard";
import DailySalesCard from "../modal/DailySalesCard";
import TrafficByCountryCard from "../modal/TrafficByCountryCard";
import SidebarModal from "../modal/Sidebar";


import { Link, useNavigate } from 'react-router-dom';


const seoPerformance = [
  { label: 'Good', color: 'green', icon: <FaCheckCircle />, description: 'Optimized SEO for all key pages.' },
  { label: 'Needs Improvement', color: 'orange', icon: <FaExclamationTriangle />, description: 'Some elements are missing metadata.' },
  { label: 'Poor', color: 'red', icon: <FaTimesCircle />, description: 'Critical SEO issues detected.' },
];


const status = 'Poor'; // Example status from backend
const currentPerformance = seoPerformance.find((perf) => perf.label === status);


export default function Dashboard  () {

  const [rows, setRows] = useState([
    {
      companyName: "Material XD Version",
      companyImage: "./images/xd.jpg",
      members: [
        "./images/p1.jpg",
        "./images/p2.jpg",
        "./images/p3.jpg",
        "./images/p4.jpg",
      ],
      budget: "$14,000",
      completion: "60%",
      completionWidth: "60%",
    },
    {
      companyName: "Add Progress Track",
      companyImage: "./images/test2.jfif",
      members: ["./images/p1.jpg", "./images/p2.jpg"],
      budget: "$3,000",
      completion: "10%",
      completionWidth: "10%",
    },
    {
      companyName: "Fix Platform Errors",
      companyImage: "./images/test3.jpg",
      members: ["./images/p4.jpg", "./images/p1.jpg"],
      budget: "Not set",
      completion: "100%",
      completionWidth: "100%",
    },
  ]);

  const addRow = () => {
    const newRow = {
      companyName: "New Company",
      companyImage: "./images/new.jpg",
      members: ["./images/p1.jpg"],
      budget: "$5,000",
      completion: "20%",
      completionWidth: "20%",
    };
    setRows([...rows, newRow]);
  };

  const handleEdit = (index) => {
    // Logic to edit the row
    const updatedRows = [...rows];
    updatedRows[index].budget = "$10,000"; // Just as an example
    setRows(updatedRows);
  };

  const handleDelete = (index) => {
    // Logic to delete the row
    const updatedRows = rows.filter((row, i) => i !== index);
    setRows(updatedRows);
  };

  const timelineItems = [
    {
      icon: <FaRegBell />,
      color: "text-green-500",
      title: "$2400, Design changes",
      date: "22 DEC 7:20 PM",
    },
    {
      icon: <IoCode />,
      color: "text-red-500",
      title: "New order #1832412",
      date: "21 DEC 11 PM",
    },
    {
      icon: <MdOutlineShoppingCart />,
      color: "text-blue-500",
      title: "Server payments for April",
      date: "21 DEC 9:34 PM",
    },
    {
      icon: <FaRegCreditCard />,
      color: "text-yellow-500",
      title: "New card added for order #4395133",
      date: "20 DEC 2:20 AM",
    },
    {
      icon: <BsFillKeyFill />,
      color: "text-red-500",
      title: "Unlock packages for development",
      date: "18 DEC 4:54 AM",
    },
    {
      icon: <GiMoneyStack />,
      color: "text-gray-700",
      title: "New order #9583120",
      date: "17 DEC",
    },
  ];
  
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
                placeholder="Type here..."
                className="border border-gray-300 p-[0.5rem] text-sm rounded-lg focus:outline-none focus:border-pink-700   focus:ring-1 focus:ring-pink-700 shadow-sm"
                />

              <Link to="/dashboard/addwebsite">
              <button onClick={addRow} className="border-1 border-pink-600 text-pink-600 p-[0.5rem] text-[14px] font-small rounded-md">
              Add website
          </button>
                 </Link>
        <button
       
          className="border-1 border-blue-600  text-blue-600  p-[0.5rem] text-[14px] font-small rounded-md"
        >
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
            <FaRankingStar className="w-5 h-5 text-white "/>
   
            </div>
            </div>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 "></div>
            <div className="text-gray-600  mt-2">Traffic rank of site, compared to all other sites in the world</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
  
    <div className="flex justify-between items-center">
      <div>
        <div className="text-gray-600 text-sm">SEO Performance</div>
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

    <div className="mt-4"  style={{ color: currentPerformance.color }}>{currentPerformance.description}</div>
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
      <SiInstatus  className="w-5 h-5 text-white" />
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
        <div className="flex max-w-[100%] mx-auto mt-6 gap-6">
        <div className="w-[66%] min-h-[450px] bg-white border border-gray-200 rounded-lg p-0">
        <div className="flex justify-between items-center px-5 py-5 pb-0">
        <h2 className="text-[18px] font-semibold">Websites</h2>
       
      </div>
  <div className="text-gray-600 pt-2 pb-2">
    <span className="font-bold text-gray-600 pl-5">30 done</span>
    <span className="ml-1 text-gray-500">this month</span>
  </div>

  <div className="card-body px-0 pb-1">
      <div className="max-h-[340px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
        <table className="min-w-full text-left table-auto border-separate border-spacing-y-0">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-gray-500 text-xs font-bold uppercase">
              <th className="py-2 pl-5">Companies</th>
              <th className="py-2 pl-6">Members</th>
              <th className="py-2 text-center">Completion</th>
              <th className="py-2 text-center">CRUD</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr className="bg-white" key={index}>
                <td className="px-4 py-3 border-t-2 border-gray-600">
                  <div className="flex items-center">
                    <img
                      src={row.companyImage}
                      alt={row.companyName}
                      className="w-8 h-8 mr-5 rounded-lg"
                    />
                    <div>
                      <h6 className="text-sm font-semibold text-gray-800">
                        {row.companyName}
                      </h6>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border-t-2 border-gray-600">
                  <div className="flex -space-x-2">
                    {row.members.map((member, memberIndex) => (
                      <img
                        src={member}
                        alt={`team${memberIndex + 1}`}
                        key={memberIndex}
                        className="w-6 h-6 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                </td>
              
                <td className="px-4 py-3 border-t-2 border-gray-600">
                  <div className="w-3/4 mx-auto">
                    <div className="text-start text-xs font-bold text-gray-700 mb-1">
                      {row.completion}
                    </div>
                    <div className="relative h-2 bg-gray-200 rounded">
                      <div
                        className="absolute top-0 left-0 h-2 bg-blue-500 rounded"
                        style={{ width: row.completionWidth }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="text-center px-4 py-3 border-t-2 border-gray-600 text-sm">
                  <div className="mt-2 flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 hover:text-blue-700"
                      aria-label="Edit"
                    >
                      <Link to="/dashboard/editwebsite">
                      <FaEdit className="w-5 h-5" />
                      </Link>
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete"
                    >
                      <FaTrashAlt className="w-5 h-5" />
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

<div className="w-[32%] bg-white border border-gray-200 rounded-lg p-4">
      <h2 className="text-[18px] font-semibold">Orders overview</h2>
      <div className="text-gray-600 mt-2">
        <i className="fa fa-arrow-up text-green-500 mr-1" aria-hidden="true"></i>
        <span className="font-bold text-gray-600">24%</span>
        <span className="ml-1 text-gray-500">this month</span>
      </div>

      <div className="mt-8">
        <div className="timeline space-y-4">
          {timelineItems.map((item, index) => (
            <div className="timeline-block flex items-start" key={index}>
              <span
                className={`timeline-step w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 ${item.color}`}
              >
                <span className="material-icons">{item.icon}</span>
              </span>
              <div className="timeline-content ml-4">
                <h6 className="text-sm font-bold text-gray-800 mb-1">
                  {item.title}
                </h6>
                <p className="font-medium text-gray-500 text-xs ">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};


