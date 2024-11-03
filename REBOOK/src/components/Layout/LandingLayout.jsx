import React, { useState } from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const LandingLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row bg-teal-100 overflow-x-hidden">
      <div className={`fixed inset-y-0 left-0 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        <Sidebar />
      </div>
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="p-4 flex-1 overflow-hidden">
          <Outlet context={{ isSidebarOpen }} />
        </main>
      </div>
    </div>
  );
};

export default LandingLayout;
