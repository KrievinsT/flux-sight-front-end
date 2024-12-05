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

  return (
    <div className="min-h-screen ml-[15rem] flex bg-gray-100 p-2">
      <SidebarModal />
      <div className="flex-1 pl-4 pr-2 overflow-y-auto">
        <header className="flex items-center justify-between mb-8">
          <div className="pl-3 flex items-center text-[16px] font-small text-gray-600">
            Pages /
            <Link to="/tables">
              <h1 className="text-[16px] cursor-pointer font-small text-black ml-1">Tables</h1>
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
            <IoSettingsOutline className="w-5 h-5 cursor-pointer text-gray-600" onClick={() => setIsSettingsOpen(true)} />
            <SettingsBar isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <NotificationDropdown />
            <Logout />
          </div>
        </header>

        <div className="flex justify-center items-center mt-14">
          <div className="w-full max-w-6xl border bg-white rounded-lg pt-6 pb-1">
            <div className="bg-gray-900 text-white w-full text-start rounded-lg py-4 shadow-lg -mt-12 px-6 max-w-[97%] mx-auto" style={{ backgroundImage: "linear-gradient(195deg, #42424a, #191919)" }}>
              <h2 className="text-xl font-bold tracking-wide text-gray-100">Contributors Table</h2>
            </div>
            <div className="table-responsive mt-4">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Author</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Employed</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contributors.map((contributor) => (
                    <tr key={contributor.id} className="border-t">
                      <td className="px-4 py-3 flex items-center">
                        {contributor.avatar && (
                          <img src={contributor.avatar} alt={contributor.name} className="w-10 h-10 rounded-lg mr-3" />
                        )}
                        <div>
                          <h6 className="text-sm font-semibold">{contributor.name}</h6>
                          <p className="text-xs text-gray-500">{contributor.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-gray-600">{contributor.employed}</td>
                      <td className="px-4 py-3 text-center">
                        <Link to="/tables/edittable" state={{ userId: contributor.id }}>
                          <button className="text-gray-500 text-sm font-semibold hover:text-blue-600">Edit</button>
                        </Link>
                        <button onClick={() => handleRemoveClick(contributor)} className="text-gray-500 pl-2 text-sm font-semibold hover:text-pink-600">Remove</button>
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
