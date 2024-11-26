
import React, { useState, useEffect } from "react";

import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import NotificationDropdown from "../modal/NotificationDropdown";
import SidebarModal from "../modal/Sidebar";

import { Link, useNavigate } from 'react-router-dom';

export default function Tables () {

  const contributors = [
    {
      id: 1,
      name: "John Michael",
      email: "email@example.com",
      role: "Admin", 
      status: "Online",
      employed: "23/04/18",
      avatar: "/images/p2.jpg", 
    },
    {
      id: 2,
      name: "Alexa Liras",
      email: "email@example.com",
      role: "Editor",    
      status: "Offline",
      employed: "11/01/19",
      avatar: "/images/p1.jpg", 
    },
    {
      id: 3,
      name: "Laurent Perrier",
      email: "email@example.com",
      role: "Viewer", 
      status: "Online",
      employed: "19/09/17",
      avatar: "/images/p4.jpg", 
    },
    {
      id: 4,
      name: "Toms Ginters",
      email: "email@example.com",
      role: "User",
      status: "Offline",
      employed: "11/11/20",
      avatar: "/images/p4.jpg", 
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
            <Link to="/tables">
            <h1 className="text-[16px] cursor-pointer font-small text-black ml-1" >Tables</h1> 
            </Link>
        </div>
          
          <div className="flex items-center space-x-4">
          
          <Link to="/dashboard/addcontributor">
                 <button
                 className="border-1 border-pink-600  text-pink-600  p-[0.5rem] text-[14px] font-small rounded-md" >
                 Add Contributor
              </button>
              </Link>

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
            
                <Link to="/settings">
                 <IoSettingsOutline className="w-5 h-5 cursor-pointer text-gray-600"/> 
                 </Link>

                 <NotificationDropdown />
                
                <Link to="/register">
                <FaRegUserCircle  className="w-5 h-5 cursor-pointer text-gray-600 " />
                </Link>
          </div>
        </header>

        <div className="flex justify-center items-center mt-14">
      <div className="w-full max-w-6xl border bg-white rounded-lg  pt-6 pb-1">
              <div
                className="bg-gray-900 text-white w-full text-start rounded-lg py-4 shadow-lg -mt-12 px-6 max-w-[97%] mx-auto"
                style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}
              >
                <h2 className="text-xl font-bold tracking-wide text-gray-100">
                  Contributors Table
                </h2>
          </div>
        <div className="table-responsive mt-4">
          <table className="min-w-full  table-auto">
            <thead  className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Author
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                  Roles
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                  Employed
                </th>
                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
            {contributors.map((contributor) => (
                <tr key={contributor.id} className="border-t">
                  <td className="px-4 py-3 flex items-center">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-10 h-10 rounded-lg mr-3"
                    />
                    <div>
                      <h6 className="text-sm font-semibold">{contributor.name}</h6>
                      <p className="text-xs text-gray-500">{contributor.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {/* Role with Gradient Style */}
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase text-white inline-flex items-center justify-center`}
                      style={{
                        backgroundImage:
                          contributor.role === "Admin"
                            ? "linear-gradient(195deg, #ff4d4d, #ff1a1a)"
                            : contributor.role === "Editor"
                            ? "linear-gradient(195deg, #1d74e4, #0a58d4)"
                            : contributor.role === "Viewer"
                            ? "linear-gradient(195deg, #6c757d, #495057)"
                            : "linear-gradient(195deg, #28a745, #218838)",
                        width: "70px", 
                      }}
                    >
                      {contributor.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase text-white`}
                      style={{
                        backgroundImage:
                          contributor.status === "Online"
                            ? "linear-gradient(195deg, #3fb906, #1a9e08)"
                            : "linear-gradient(195deg, #757575, #424242)",
                      }}
                    >
                      {contributor.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                    {contributor.employed}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link to="/tables/edittable" state={{ userId: contributor.id }}>
                      <button className="text-gray-500 text-sm font-semibold hover:text-blue-600">
                        Edit
                      </button>
                    </Link>
                    <button className="text-gray-500 pl-2 text-sm font-semibold hover:text-pink-600">
                      Remove
                    </button>
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
  
  );
};




