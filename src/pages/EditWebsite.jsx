import React, { useState, useEffect } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import NotificationDropdown from "../modal/NotificationDropdown";
import SidebarModal from "../modal/Sidebar";
import SettingsBar from "../modal/SettingsBar";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from 'axios';


import Logout from '../modal/Logout';

export default function EditWebsite() {

  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Convert members into state variable with initial data from location.state
  const { websiteName = "", url = "" } = location.state || {};
  const [members, setMembers] = useState(location.state?.members || []);

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    username: '',
    id: '', 
  });

  const removeMember = (index) => {
    setMembers((prevMembers) => prevMembers.filter((_, i) => i !== index));
  };

  useEffect(() => {
    // Function to get query parameters
    const getQueryParam = (param) => {
      let urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    };

    // Decode the JSON data from query string
    const data = getQueryParam('data');
    if (data) {
      let decodedData = JSON.parse(decodeURIComponent(data));
      setFormData(decodedData);
      console.log('Decoded data:', decodedData);
    } else {
      console.error('No data found in query parameters');
    }
  }, []);

  const [errors, setErrors] = useState({
    websiteName: "",
    url: "",
    memberName: "",
    memberEmail: "",
  });

  const validateInput = (name, value) => {
    let error = "";

    if (name === "websiteName" && value.trim().length < 3) {
      error = "Website name must be at least 3 characters long.";
    } else if (name === "url" && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
      error = "Enter a valid URL (e.g., https://example.com).";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Form Data:', formData);
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const value = formData[field];
      let error = "";
  
      if (field === "title" && value.trim().length < 3) {
        error = "Website name must be at least 3 characters long.";
      } else if (field === "url" && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
        error = "Enter a valid URL (e.g., https://example.com).";
      }
  
      if (error) {
        newErrors[field] = error;
      }
    });
  
    setErrors(newErrors);
  
    const hasErrors = Object.keys(newErrors).length > 0;
  
    if (!hasErrors) {
      try {
        const response = await axios.put(`/web/${formData.id}`, {
          title: formData.title, // Ensure title is included here
          url: formData.url,
          username: formData.username, // Include username in the request body
        });
  
        console.log("Update successful:", response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Please fix the errors before submitting.");
    }
  };
  
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const mockUsers = [
  //       {
  //         id: 1,
  //         name: "John Doe",
  //         email: "john.doe@example.com",
  //         phone: "123-456-7890",
  //         role: "Admin",
  //         profileImage: "/images/p4.jpg",
  //       },
  //       {
  //         id: 2,
  //         name: "Jane Smith",
  //         email: "jane.smith@example.com",
  //         phone: "098-765-4321",
  //         role: "User",
  //         profileImage: "/images/p2.jpg",
  //       },
  //       {
  //         id: 3,
  //         name: "Emily Johnson",
  //         email: "emily.johnson@example.com",
  //         phone: "555-123-4567",
  //         role: "Viewer",
  //         profileImage: "/images/p3.jpg",
  //       },
  //     ];
  //     setUsers(mockUsers);
  //   };

  //   fetchUsers();
  // }, []);

  const handleSelectUser = (userId) => {
    alert(`User with ID ${userId} selected`);
  };

  const addUser = () => {
    setUsers([...users, { name: '', email: '', phone_number: '' }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedUsers = users.map((user, i) =>
      i === index ? { ...user, [name]: value } : user
    );
    setUsers(updatedUsers);
  };

  const handleUserFormSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const response = await axios.post('http://localhost:8000/api/users', users);
    //   console.log(response.data);
    //   // Handle successful response
    // } catch (error) {
    //   console.error('There was an error submitting the form!', error);
    //   // Handle error response
    // }
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
              <h1 className="text-[16px] cursor-pointer font-small text-black ml-1" >Edit website</h1>
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
        <div className="mb-0 pl-3  text-[1.7rem] text-gray-900 font-bold">Edit website </div>
        <div className="mb-8 pl-3 text-[1.2rem] text-gray-600 ">Edit you're website, to watch list. </div>

        <div className="flex justify-center items-center">
          <div className="w-full max-w-[60%] bg-white rounded-lg shadow-lg p-6">

            <div
              className="bg-gray-900 text-white w-full text-center rounded-lg py-4 -mt-12 px-6"
              style={{ backgroundImage: 'linear-gradient(195deg, #313152, #010d21)' }}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-gray-100 drop-shadow-lg">
                Edit website
              </h2>

            </div>
            <form className="px-0 pt-7" onSubmit={handleSubmit} noValidate>
              {/* Website Name */}
              <div className="mb-4">
                <label htmlFor="websiteName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Edit Website Name
                </label>
                <input
                  type="text"
                  name="title"
                  id="websiteName"
                  value={formData.title}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline 
                    ${errors.websiteName ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border border-gray-300 focus:ring-2 focus:ring-blue-400"}`}
                  placeholder="Enter website name"
                />
                {errors.websiteName && (
                  <span className="text-red-500 text-xs mt-2 inline-block">
                    {errors.websiteName}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-2">
                  Edit Website URL
                </label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  value={formData.url}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-[1.5] focus:outline-none focus:shadow-outline 
                    ${errors.url ? "border-red-500 focus:ring-2 focus:ring-red-400" : "border border-gray-300 focus:ring-2 focus:ring-blue-400"}`}
                  placeholder="https://example.com"
                />
                {errors.url && (
                  <span className="text-red-500 text-xs mt-2 inline-block">
                    {errors.url}
                  </span>
                )}
              </div>

              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className={`w-full md:w-1/2 bg-gray-900 hover:bg-gray-800 text-white mt-4 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${Object.values(errors).some((err) => err)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  style={{ backgroundImage: 'linear-gradient(195deg, #313152, #010d21)' }}
                  disabled={Object.values(errors).some((err) => err)}
                >
                  Save
                </button>
              </div>
            </form>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

