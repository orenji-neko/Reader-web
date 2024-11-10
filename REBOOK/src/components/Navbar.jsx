import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Navbar({ toggleSidebar, isSidebarOpen, toggleNotif }) {
  return (
    <div className="flex justify-between bg-teal-200 p-4 border-b-2 border-gray-400">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className={`focus:outline-none flex flex-col justify-center items-center space-y-1 transform transition-transform duration-500 ease-in-out ${
            isSidebarOpen ? 'rotate-90' : 'rotate-0'
          }`}
        >
          <div className="h-1 w-6 bg-black transition-transform duration-500 ease-in-out" />
          <div className="h-1 w-6 bg-black transition-transform duration-500 ease-in-out" />
          <div className="h-1 w-6 bg-black transition-transform duration-500 ease-in-out" />
        </button>
        <a href="/">
          <img src="/rebook-images/Component2.png" alt="ReBook Logo" className="ml-4 h-8" />
        </a>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBell} className="text-black text-xl cursor-pointer" onClick={toggleNotif} />
      </div>
    </div>
  );
}

export default Navbar;
