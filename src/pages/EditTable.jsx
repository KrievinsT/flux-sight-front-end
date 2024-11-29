import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarModal from "../modal/Sidebar";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import NotificationDropdown from "../modal/NotificationDropdown";
import { Link } from 'react-router-dom';
import SettingsBar from '../modal/SettingsBar';

export default function EditTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {}; 
  const [selectedRole, setSelectedRole] = useState("");
  const [user, setUser] = useState(null); 
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSave = () => {
  
    console.log("Saved role:", selectedRole);
  };

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

 
  useEffect(() => {
    const foundUser = contributors.find((contributor) => contributor.id === userId);
    if (!foundUser) {
      navigate("/tables");
    } else {
      setUser(foundUser);
      setSelectedRole(foundUser.role); 
    }
  }, [userId, navigate]);

  
  if (!user) {
    return <div>Loading...</div>; 
  }


  return (
    <div className="min-h-screen ml-[15rem] flex bg-gray-100 p-2">
      <SidebarModal />

      <div className="flex-1 pl-4 pr-2 overflow-y-auto">
      <header className="flex items-center justify-between mb-8">
        <div className=" pl-3 flex items-center text-[16px] font-small text-gray-600">
            Pages /
            <Link to="/tables">
            <h1 className="text-[16px] cursor-pointer font-small text-gray-600 ml-1" >Tables /</h1> 
            </Link>
            <Link to="/tables/edittable">
            <h1 className="text-[16px] cursor-pointer font-small text-black ml-1" >Edit table</h1> 
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
        <div className="w-[60%] max-w-6xl border bg-white rounded-lg p-6 relative">
        <button
      onClick={() => navigate("/tables")}
      className="absolute top-2 right-3 text-gray-600 text-3xl font-semibold hover:text-gray-800 focus:outline-none"
    >
      ×
    </button>
            <div
              className="bg-gray-900 text-white w-full text-center rounded-lg py-4 shadow-lg -mt-12 px-6 max-w-[95%] mx-auto"
              style={{
                backgroundImage: "linear-gradient(195deg, #42424a, #191919)",
              }}
            >
              <h2 className="text-2xl font-bold tracking-wide text-gray-100">
                Edit Role
              </h2>
            </div>
            <div className="p-6">
                <div className="flex items-center mb-6">
                    <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-lg mr-4"
                    />
                    <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">{user.email}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b pb-4">
                    {/* Box 1: Role */}
                    <div className="flex items-center">
                        <span className="text-gray-800 text-[17px] font-medium">Role:</span>
                        <span
                        className="px-3 py-1 rounded-lg text-xs font-semibold uppercase text-white inline-flex items-center justify-center ml-2"
                        style={{
                            backgroundImage:
                            selectedRole === "Admin"
                                ? "linear-gradient(195deg, #ff4d4d, #ff1a1a)"
                                : selectedRole === "Editor"
                                ? "linear-gradient(195deg, #1d74e4, #0a58d4)"
                                : selectedRole === "Viewer"
                                ? "linear-gradient(195deg, #6c757d, #495057)"
                                : "linear-gradient(195deg, #28a745, #218838)",
                            width: "70px", 
                        }}
                        >
                        {selectedRole}
                        </span>
                    </div>

                    {/* Box 2: Status */}
                    <div className="flex items-center">
                        <span className="text-gray-800 text-[17px] font-medium">Status:</span>
                        <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase text-white ml-2`}
                        style={{
                            backgroundImage:
                            user.status === "Online"
                                ? "linear-gradient(195deg, #3fb906, #1a9e08)"
                                : "linear-gradient(195deg, #757575, #424242)",
                        }}
                        >
                        {user.status}
                        </span>
                    </div>

                    {/* Box 3: Employed Since */}
                    <div className="flex items-center">
                        <span className="text-gray-800 text-[17px] font-medium">Employed Since:</span>
                        <span className="pl-1 text-gray-600 font-medium">{user.employed}</span>
                    </div>
                    </div>
                </div>

                {/* Box 4: Role Input Dropdown and Save Button */}
                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center">
                    <span className="text-gray-800 text-[17px] font-medium">Change Role:</span>
                    <select
                        className="ml-4 p-1 border rounded-md bg-white"
                        value={selectedRole} 
                        onChange={(e) => setSelectedRole(e.target.value)} 
                    >
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Viewer">Viewer</option>
                        <option value="User">User</option>
                    </select>
                    </div>

                    <button
                    className="ml-6 px-6 py-2 text-white rounded-md"
                    style={{
                        backgroundImage: "linear-gradient(195deg, #42424a, #191919)",
                    }}
                    onClick={handleSave} 
                    >
                    Save Changes
                    </button>
                </div>
                </div>

          </div>
        </div>
      </div>
    </div>
  );
}
