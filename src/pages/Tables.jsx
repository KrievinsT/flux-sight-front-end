import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import NotificationDropdown from "../modal/NotificationDropdown";
import SidebarModal from "../modal/Sidebar";
import ConfirmationModal from "../modal/ConfirmationModal";
import { Link, useNavigate } from 'react-router-dom';
import SettingsBar from '../modal/SettingsBar';
import Logout from '../modal/Logout';

export default function Tables() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contributors, setContributors] = useState([]);

//vari atvert server log ?

  useEffect(() => {
    const username = sessionStorage.getItem('username');

    axios.get(`/users?username=${username}`)
      .then(response => {
        console.log("API response:", response.data);
        setContributors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleRemoveClick = (contributor) => {
    setSelectedContributor(contributor);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    setContributors(contributors.filter((c) => c.id !== selectedContributor.id));
    setIsModalOpen(false);
    setSelectedContributor(null);
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
    <div className="min-h-screen ml-[15rem] flex p-2">
     <SidebarModal darkMode={darkMode} />
     <div className={`flex-1 pl-4 pr-2 overflow-y-auto ${navbarFixed ? "mt-[5.7%]" : ""}`}>
      <header
          className={`flex items-center justify-between mb-8  ${
            navbarFixed
              ? `fixed top-0 ml-[15rem] rounded-lg p-2 left-4 right-0 z-50 shadow-md ${
                  darkMode
                    ? "bg-gradient-to-br from-[#323a54] to-[#1a2035]"
                    : "bg-white text-black"
                }`
              : ""
          }`}
        >
          <div className={`pl-3 flex items-center text-[16px] font-small ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Pages /
            <Link to="/tables">
              <h1 className={`text-[16px] cursor-pointer font-small ml-1 ${darkMode ? "text-[#fff]" : "text-black"}`} >Tables</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/tables/addcontributor">
              <button className="border-1 border-pink-600 text-pink-600 p-[0.5rem] text-[14px] font-small rounded-md">Add Contributor</button>
            </Link>
            <Link to="/dashboard/addwebsite">
              <button className="border-1 border-pink-600 text-pink-600 p-[0.5rem] text-[14px] font-small rounded-md">Add website</button>
            </Link>
            <button className="border-1 border-blue-600 text-blue-600 p-[0.5rem] text-[14px] font-small rounded-md">Check Insights</button>
            <IoSettingsOutline
              className={`w-5 h-5 cursor-pointer ${darkMode ? "text-gray-300 hover:text-[#fff]" : " text-gray-600 hover:text-gray-800"}`}
              onClick={() => setIsSettingsOpen(true)}
            />
            <SettingsBar
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              setNavbarFixed={setNavbarFixed} 
              navbarFixed={navbarFixed} 
              setDarkMode={setDarkMode} 
              darkMode={darkMode} 
            />
           <NotificationDropdown
              darkMode={darkMode}
            />

            <Logout darkMode={darkMode} />
          </div>
        </header>

        <div className="flex justify-center items-center mt-14">
          <div className={`w-full max-w-6xl rounded-lg pt-6 pb-1 ${darkMode
              ? "bg-[#1D1D1D] border-1 border-white border-opacity-50 shadow-md"
              : "bg-white border-2 border-gray-200 border-opacity-100 shadow-sm"
              }`}>
            <div className="bg-gray-900 text-white w-full text-start rounded-lg py-4 shadow-lg -mt-12 px-6 max-w-[97%] mx-auto" 
           style={{ backgroundImage: 'linear-gradient(195deg, #313152, #010d21)' }}>
              <h2 className="text-xl md:text-2xl font-bold tracking-wide text-gray-100">Contributors Table</h2>
            </div>
            <div className="table-responsive mt-4">
              <table className="min-w-full table-auto">
                <thead className={`
                ${darkMode
                    ? "bg-gradient-to-br from-[#323a54] to-[#1a2035]"
                    : "bg-gray-200"
                }`}>
                  <tr className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <th className="px-4 py-2 text-left text-sm font-semibold ">Author</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold ">Employed</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors.map((contributor) => (
                    <tr key={contributor.id} className="border-t">
                      <td className="px-4 py-3 flex items-center">
                        
                        <div>
                          <h6 className={`text-sm font-semibold ${darkMode ? "text-[#fff]" : ""}`}>{contributor.name}</h6>
                          <p className={`text-xs  ${darkMode ? "text-gray-300" : "text-gray-500"}`}>{contributor.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-gray-600">{contributor.employed}</td>
                      <td className="px-4 py-3 text-center">
                        <Link to="/tables/edittable" state={{ userId: contributor.id }}>
                          <button className={`text-sm font-semibold hover:text-blue-600 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>Edit</button>
                        </Link>
                        <button onClick={() => handleRemoveClick(contributor)} className={`pl-2 text-sm font-semibold hover:text-pink-600  ${darkMode ? "text-gray-300" : "text-gray-800"}`}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmRemove} contributorName={selectedContributor?.name} />
    </div>
  );
}
