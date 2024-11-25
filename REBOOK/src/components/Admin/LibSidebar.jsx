// LibSidebar.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineDashboard } from "react-icons/md";
import { MdInventory2 } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoMdWarning } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../utils/AuthProvider";

function LibSidebar() {
  const [image, setImage] = useState(""); // Initialize state for user image
  const [name, setName] = useState("User"); // Initialize the state for name

  const { validate, logout, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/v1/user/details", {
        method: "GET",
        headers: {
          "Authorization": token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const result = await response.json();
      
      setName(result.username);
      setImage(result.profile ? result.profile : null);
    }

    fetchData();

  }, [validate]);

  return (
    <div className="w-[100%] bg-teal-500 text-white h-full flex flex-col justify-between p-4 border-r-2 border-teal-400">
      <div>
        <div className="p-4 flex items-center h-10">
          <Link to="/librarian/libuser" className="flex items-center">
            {image ? (
              <img
                src={`/api/v1/file/${image}`}
                alt="User"
                className="w-10 h-10 rounded-full mr-2"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="w-9 h-9 text-black mr-2"
              />
            )}
          </Link>
          <h1 className="text-black text-sm sm:text-base mb-2 pt-3">
            Welcome, <span className="font-bold">{name}</span>
          </h1>
        </div>
        {/* Navigation Links */}
        <ul className="mt-0 text-gray-300">
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/librarian" className="flex items-center px-3 w-full">
              <MdOutlineDashboard className="inline-block mr-2 text-black" />
              <span className="transition-colors duration-200 group-hover:text-black text-white">Dashboard</span>
            </Link>
          </li>
          <hr className="border-black" />
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/librarian/request" className="flex items-center px-3">
              <BsFillPersonLinesFill className="inline-block mr-2 text-black" />
              <span className="transition-colors duration-200 group-hover:text-black text-white">Request</span>
            </Link>
          </li>
          <hr className="border-black" />
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/librarian/inventory" className="flex items-center px-3">
              <MdInventory2 className="inline-block mr-2 text-black" />
              <span className="transition-colors duration-200 group-hover:text-black text-white">Book Inventory</span>
            </Link>
          </li>
          <hr className="border-black" />
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/librarian/readers" className="flex items-center px-3">
              <FaBookReader className="inline-block mr-2 text-black" />
              <span className="transition-colors duration-200 group-hover:text-black text-white">Readers</span>
            </Link>
          </li>
          <hr className="border-black" />
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/librarian/due" className="flex items-center px-3">
              <IoMdWarning className="inline-block mr-2 text-black" />
              <span className="transition-colors duration-200 group-hover:text-black text-white">Due Books</span>
            </Link>
          </li>
          <hr className="border-black" />
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link className="flex items-center px-3" onClick={() => logout()}>
              <BiLogOut className="inline-block mr-2 text-black" />
              <span className="transition-colors duration-200 group-hover:text-black text-white">Log Out</span>
            </Link>
          </li>
          <hr className="border-black" />
        </ul>
      </div>
      {/* Footer Section */}
      <div style={{ position: "relative", height: "100vh" }}>
        <img
          src="/rebook-images/bok1.png"
          alt="bgbook"
          style={{
            width: "9rem",
            height: "9rem",
            filter: "brightness(0.2)", // Adjust the value to make the image darker
            position: "absolute",
            bottom: -12,
            left: -10
          }}
        />
      </div>
    </div>
  );
}

export default LibSidebar;
