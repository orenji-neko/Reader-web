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

  const { validate, logout } = useAuth();

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUserDetails = localStorage.getItem("userDetails");
    const storedImage = localStorage.getItem("userImage");

    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      setName(userDetails.name || "User");
    }

    if (storedImage) {
      setImage(storedImage);
    } else {
      setImage("/rebook-images/default_profile.png");
    }

    // Alternatively, fetch user data from the validate method if needed
    // validate().then(res => setName(res.fullname));
  }, [validate]);

  return (
    <div className="min-w-64 bg-teal-500 text-white h-full flex flex-col justify-between p-4">
      <div>
        <div className="p-4 flex items-center h-10">
          <Link to="/librarian/libuser" className="flex items-center">
            {image ? (
              <img
                src={image}
                alt="User"
                className="w-10 h-10 rounded-full mr-2"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="w-12 h-12 text-white mr-2"
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
      <div className="p-0">
        <img
          src="/rebook-images/bok1.png"
          alt="bgbook"
          className="w-40 h-30 sm:w-48 sm:h-36 mt-auto"
        />
      </div>
    </div>
  );
}

export default LibSidebar;
