
import React, { useState, useEffect } from "react";

import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import NotificationDropdown from "../modal/NotificationDropdown";
import SidebarModal from "../modal/Sidebar";
import { FaUsers } from "react-icons/fa";
import SettingsBar from '../modal/SettingsBar';

import { Link, useNavigate } from 'react-router-dom';

export default function AddContributor () {

    const [contributors, setContributors] = useState([
        { id: 1, name: "John Michael", email: "email@example.com", role: "Admin", status: "Online", avatar: "/images/p2.jpg" },
        { id: 2, name: "Alexa Liras", email: "email@example.com", role: "Editor", status: "Offline", avatar: "/images/p1.jpg" },
        { id: 3, name: "Laurent Perrier", email: "email@example.com", role: "Viewer", status: "Online", avatar: "/images/p4.jpg" },
        { id: 4, name: "Toms Ginters", email: "email@example.com", role: "User", status: "Offline", avatar: "/images/p4.jpg" },
      ]);
    
      const [selectedContributor, setSelectedContributor] = useState(null);
      const [selectedRole, setSelectedRole] = useState('');
      const [originalRole, setOriginalRole] = useState('');
      const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
      const handleSelect = (id) => {
        if (selectedContributor === id) {
         
          setSelectedContributor(null);
          setSelectedRole(originalRole); 
        } else {
          
          const contributor = contributors.find((c) => c.id === id);
          setSelectedContributor(id);
          setOriginalRole(contributor ? contributor.role : '');
          setSelectedRole(contributor ? contributor.role : '');
        }
      };
    
     
      const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setSelectedRole(newRole);
      };
    
      
      const handleSaveRole = () => {
        if (selectedContributor) {
        
          setContributors((prevContributors) =>
            prevContributors.map((contributor) =>
              contributor.id === selectedContributor
                ? { ...contributor, role: selectedRole }
                : contributor
            )
          );
          setSelectedContributor(null); 
          setOriginalRole(''); 
        }
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
            <Link to="/tables">
            <h1 className="text-[16px] cursor-pointer font-small text-gray-600 ml-1" >Tables /</h1> 
            </Link>
            <Link to="/tables/addcontributor">
            <h1 className="text-[16px] cursor-pointer font-small text-black ml-1" >Add Contributor</h1> 
            </Link>
        </div>
          
          <div className="flex items-center space-x-4">
          
          <Link to="/tables/addcontributor">
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
            
        <IoSettingsOutline
          className="w-5 h-5 cursor-pointer text-gray-600"
          onClick={() => setIsSettingsOpen(true)} 
        />
      
        <SettingsBar
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        />

                 <NotificationDropdown />
                
                <Link to="/register">
                <FaRegUserCircle  className="w-5 h-5 cursor-pointer text-gray-600 " />
                </Link>
          </div>
        </header>

        <div className="flex justify-center items-center mt-14">
      <div className="w-full max-w-6xl border bg-white rounded-lg  pt-6 pb-6">
              <div
                className="bg-gray-900 text-white w-full text-center rounded-lg py-4 shadow-lg -mt-12 px-6 max-w-[97%] mx-auto"
                style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}
              >
               <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
                Add Contributors
              </h2>
          </div>
          <div className="relative flex items-center justify-center mt-6">
            <form className="relative w-full max-w-[300px] min-w-[153px]">
                {/* Input Field */}
                <input
                type="text"
                placeholder="Search User"
                className="pl-10 pr-12 py-2 border-2 border-gray-300 rounded-lg text-sm w-full"
                />

                <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M11 2a9 9 0 1 0 6.293 15.293l4.707 4.707a1 1 0 0 0 1.414-1.414l-4.707-4.707A9 9 0 0 0 11 2zM11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14z" />
                </svg>

                <div className="absolute right-0.5 inset-y-0 flex items-center ">
                <div className="bg-gray-100 w-10 h-9 rounded-r-lg flex items-center justify-center">
                    <FaUsers className="w-5 h-5 text-gray-600" />
                </div>
                </div>
            </form>
            </div>

                {/*Table of all users  */}
                <div className="table-responsive mt-4">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200">
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
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {contributors.map((contributor) => (
            <tr
              key={contributor.id}
              className={`border-t border-b ${
                contributor.id === selectedContributor
                  ? "border-3 border-blue-500"
                  : "border-gray-300"
              }`}
            >
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
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => handleSelect(contributor.id)}
                  className={`text-sm font-semibold ${
                    contributor.id === selectedContributor
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  {contributor.id === selectedContributor
                    ? "Selected"
                    : "Select"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedContributor && (
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center">
            <span className="text-gray-800 text-[17px] font-medium">
              Update Role:
            </span>
            <select
              className="ml-4 p-1 border rounded-md bg-white"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>
      )}

<div className="flex items-center justify-center mt-6">
        <button
          onClick={handleSaveRole}
          className="ml-6 px-6 py-2 font-bold text-white rounded-md"
          style={{
            backgroundImage: "linear-gradient(195deg, #42424a, #191919)",
          }}
        >
          Save Role
        </button>
      </div>
    </div>
     
    </div>

    </div>
    </div>
  
      </div>
  
  );
};




