import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SidebarModal from "../modal/Sidebar";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import NotificationDropdown from "../modal/NotificationDropdown";
import { Link } from 'react-router-dom';
import SettingsBar from '../modal/SettingsBar';
import Logout from '../modal/Logout';

export default function EditTable() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state || {};
  const [selectedRole, setSelectedRole] = useState("");
  const [user, setUser] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSave = () => {
    axios.put(`/users/${user.id}`, {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: selectedRole,
    })
      .then(response => {
        console.log("User updated successfully:", response.data);
        // Optionally, navigate to another page or show a success message
      })
      .catch(error => {
        console.error("There was an error updating the user:", error);
      });
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    console.log("Fetching contributors for username:", username);
    axios.get(`/users?username=${username}`)
      .then(response => {
        console.log("API response:", response.data);
        setContributors(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      console.log("UserId from location.state:", userId);
      console.log("Contributors:", contributors);
      const foundUser = contributors.find((contributor) => contributor.id === userId);
      console.log("Found User:", foundUser);
      if (!foundUser) {
        console.log("No user found. Redirecting to /tables.");
        navigate("/tables");
      } else {
        setUser(foundUser);
        setSelectedRole(foundUser.role);
        console.log("User set:", foundUser);
      }
    }
  }, [userId, navigate, contributors, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="min-h-screen ml-[15rem] flex bg-gray-100 p-2">
      <SidebarModal />

      <div className="flex-1 pl-4 pr-2 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="pl-3 flex items-center text-[16px] font-small text-gray-600">
            Pages /
            <Link to="/tables">
              <h1 className="text-[16px] cursor-pointer font-small text-gray-600 ml-1">Tables /</h1>
            </Link>
            <Link to="/tables/edittable">
              <h1 className="text-[16px] cursor-pointer font-small text-black ml-1">Edit table</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/tables/addcontributor">
              <button className="border-1 border-pink-600 text-pink-600 p-[0.5rem] text-[14px] font-small rounded-md">
                Add Contributor
              </button>
            </Link>

            <Link to="/dashboard/addwebsite">
              <button className="border-1 border-pink-600 text-pink-600 p-[0.5rem] text-[14px] font-small rounded-md">
                Add website
              </button>
            </Link>

            <button className="border-1 border-blue-600 text-blue-600 p-[0.5rem] text-[14px] font-small rounded-md">
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
                  <h3 className="text-lg font-semibold">
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                      className="border rounded px-2 py-1"
                    />
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      className="border rounded px-2 py-1"
                    />
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={handleInputChange}
                      className="border rounded px-2 py-1"
                    />
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">

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

                  <div className="flex items-center">
                    <span className="text-gray-800 text-[17px] font-medium">Employed Since:</span>
                    <span className="pl-1 text-gray-600 font-medium">{user.employed}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">

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
