
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineTableView } from "react-icons/md";
import { RiBillLine } from "react-icons/ri";
import { MdInsertLink } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { SlLogin } from "react-icons/sl";

import NotificationDropdown from "../modal/NotificationDropdown";
import SidebarModal from "../modal/Sidebar";

import { Link, useNavigate } from 'react-router-dom';

export default function AddWebsite () {

    const [formData, setFormData] = useState({
        websiteName: "",
        url: "",
        memberName: "",
        memberEmail: "",
      });
    
      const [errors, setErrors] = useState({
        websiteName: "",
        url: "",
        memberName: "",
        memberEmail: "",
      });
    
      const validateInput = (field, value) => {
        let error = "";
    
        if (field === "websiteName" && value.trim().length < 3) {
          error = "Website name must be at least 3 characters long.";
        } else if (field === "url" && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
          error = "Enter a valid URL (e.g., https://example.com).";
        } else if (field === "memberName" && value.trim().length < 3) {
          error = "Member name must be at least 3 characters long.";
        } else if (field === "memberEmail" && !/^\S+@\S+\.\S+$/.test(value)) {
          error = "Enter a valid email address.";
        }
    
        setErrors((prev) => ({ ...prev, [field]: error }));
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateInput(name, value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
       
        const newErrors = {};
        Object.keys(formData).forEach((field) => {
          const value = formData[field];
          let error = "";
    
          if (field === "websiteName" && value.trim().length < 3) {
            error = "Website name must be at least 3 characters long.";
          } else if (field === "url" && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
            error = "Enter a valid URL (e.g., https://example.com).";
          } else if (field === "memberName" && value.trim().length < 3) {
            error = "Member name must be at least 3 characters long.";
          } else if (field === "memberEmail" && !/^\S+@\S+\.\S+$/.test(value)) {
            error = "Enter a valid email address.";
          }
    
          if (error) {
            newErrors[field] = error;
          }
        });
    
        setErrors(newErrors);
    
       
        const hasErrors = Object.keys(newErrors).length > 0;
    
        if (!hasErrors) {
          console.log("Form submitted successfully:", formData);
        } else {
          console.log("Please fix the errors before submitting.");
        }
      };

      const [users, setUsers] = useState([]);

      // Simulate fetching users from an API
      useEffect(() => {
        const fetchUsers = async () => {
          const mockUsers = [
            {
              id: 1,
              name: "John Doe",
              email: "john.doe@example.com",
              phone: "123-456-7890",
              role: "Admin",
              profileImage: "/images/p4.jpg",
            },
            {
              id: 2,
              name: "Jane Smith",
              email: "jane.smith@example.com",
              phone: "098-765-4321",
              role: "User",
              profileImage: "/images/p2.jpg",
            },
            {
              id: 3,
              name: "Emily Johnson",
              email: "emily.johnson@example.com",
              phone: "555-123-4567",
              role: "Moderator",
              profileImage: "/images/p3.jpg",
            },
          ];
          setUsers(mockUsers);
        };
    
        fetchUsers();
      }, []);
    
      
      const handleSelectUser = (userId) => {
        alert(`User with ID ${userId} selected`);
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
            <h1 className="text-[16px] cursor-pointer font-small text-gray-600 ml-1" >Dashboard /</h1> 
            </Link>
            <Link to="/dashboard/addwebsite">
            <h1 className="text-[16px] cursor-pointer font-small text-black ml-1" >Add website</h1> 
            </Link>
        </div>
          
          <div className="flex items-center space-x-4">
          <input
                type="text"
                placeholder="Type here..."
                className="border border-gray-300 p-[0.5rem] text-sm rounded-lg focus:outline-none focus:border-pink-700   focus:ring-1 focus:ring-pink-700 shadow-sm"
                />
                 <button
          
          className="border-1 border-pink-600  text-pink-600  p-[0.5rem] text-[14px] font-small rounded-md"
        >
          Add website
        </button>
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
      <div className="mb-0 pl-3  text-[1.7rem] text-gray-900 font-bold">Add website </div>
       <div className="mb-8 pl-3 text-[1.2rem] text-gray-600 ">Add you're website, to watch list. </div>

       
        <div className="flex justify-center items-center">
      <div className="w-full max-w-[60%] bg-white rounded-lg shadow-lg p-6">

      <div
              className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6"
              style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
                Add website
              </h2>
              
            </div>
        <form className="px-0 pt-7" onSubmit={handleSubmit} noValidate>
          {/* Website Name */}
          <div className="mb-4">
            <label
                htmlFor="websiteName"
                className="block text-sm font-semibold text-gray-700 mb-2"
            >
                Website Name
            </label>
            <input
                type="text"
                name="websiteName"
                id="websiteName"
                value={formData.websiteName}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline 
                ${
                    errors.websiteName
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border border-gray-300 focus:ring-2 focus:ring-blue-400"
                }
                `}
                placeholder="Enter website name"
            />
            {errors.websiteName && (
                <span className="text-red-500 text-xs mt-2 inline-block">
                {errors.websiteName}
                </span>
            )}
            </div>

            {/* URL Input */}
            <div className="mb-4">
            <label
                htmlFor="url"
                className="block text-sm font-semibold text-gray-700 mb-2"
            >
                Website URL
            </label>
            <input
                type="text"
                name="url"
                id="url"
                value={formData.url}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline 
                ${
                    errors.url
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border border-gray-300 focus:ring-2 focus:ring-blue-400"
                }
                `}
                placeholder="e.g., https://example.com"
            />
            {errors.url && (
                <span className="text-red-500 text-xs mt-2 inline-block">
                {errors.url}
                </span>
            )}
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
         
            <div className="flex-1">
                <label
                    htmlFor="memberName"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                >
                    Search member
                </label>
                <input
                    type="text"
                    name="memberName"
                    id="memberName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline border border-gray-300 focus:ring-2 focus:ring-blue-400"
                    placeholder="Search member by name or email"
                />
            </div>

         
            <div className="flex-1">
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
                <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-xs">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone Number</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
          <tbody>
            {users.map((user) => (
              <tr className="border-t" key={user.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h6 className="text-sm font-bold text-gray-800">
                        {user.name}
                      </h6>
                    </div>
                  </div>
                </td>

                {/* User Email */}
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{user.email}</td>

                {/* User Phone Number */}
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{user.phone}</td>

                {/* User Role */}
                <td className="px-6 py-4 text-sm font-medium text-gray-600">{user.role}</td>

                {/* Action - Select Button */}
                <td className="text-center px-6 py-4">
                  <button
                    onClick={() => handleSelectUser(user.id)}
                    className="px-2 py-1 bg-pink-500 text-white rounded-md hover:bg-pink-700"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

            
        </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className={`w-[60%] bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                Object.values(errors).some((err) => err)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}   
             style={{ backgroundImage: 'linear-gradient(195deg, #42424a, #191919)' }}
              disabled={Object.values(errors).some((err) => err)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

        </div>
      </div>
  
  );
};


