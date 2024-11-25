import React, { useState } from "react";
import LibSidebar from "../Admin/LibSidebar"; // Make sure this path is correct
import LibNavbar from "../Admin/LibNavbar"; // Make sure this path is correct
import { Outlet } from "react-router-dom";
import Notif from "../Notif";

const LiblandingLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showNotif, setShowNotif] = useState(false); // Add state for notification box visibility

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleNotif = () => {
    setShowNotif(!showNotif);
  }

  return (
    <div className="flex flex-col sm:flex-row bg-teal-100 overflow-x-hidden">
      <div className={`fixed inset-y-0 left-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        <LibSidebar />
      </div>
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <LibNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} toggleNotif={toggleNotif}/>
        <main className="p-4 flex-1 overflow-hidden">
          <Outlet />
        </main>
        { showNotif && <Notif onClose={toggleNotif} / >}
      </div>
    </div>
  );
};

export default LiblandingLayout;
