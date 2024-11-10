import React, { useState } from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Notif from "../Notif";

const LandingLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showNotif, setShowNotif] = useState(false); // Add state for notification box visibility

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleNotif = () => {
    setShowNotif(!showNotif); // Function to toggle notification visibility
  };

  return (
    <div className="flex flex-col sm:flex-row bg-teal-100 overflow-x-hidden">
      <div className={`fixed inset-y-0 left-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-[20%]`}> {/* Updated width */}
        <Sidebar />
      </div>
      <div className={`sticky flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-[20%]' : 'ml-0'}`}> {/* Updated margin-left */}
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} toggleNotif={toggleNotif} /> {/* Pass toggleNotif as prop */}
        <main className="p-4 flex-1 overflow-hidden">
          <Outlet context={{ isSidebarOpen }} />
        </main>
        {showNotif && <Notif onClose={toggleNotif} />} {/* Render notification box */}
      </div>
    </div>
  );
};

export default LandingLayout;
