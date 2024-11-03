import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Using React Router's Link

function Sidebar() {
  const [image, setImage] = useState("/rebook-images/default_profile.png");
  const [name, setName] = useState("User"); // Initialize the state for name

  // Load image and name from localStorage on component mount
  useEffect(() => {
    const storedImage = localStorage.getItem("userImage");
    const storedUserDetails = localStorage.getItem("userDetails");
    if (storedImage) {
      setImage(storedImage);
    }
    if (storedUserDetails) {
      const { name } = JSON.parse(storedUserDetails);
      setName(name);
    }
  }, []);

  return (
    <div className="min-w-64 bg-teal-500 text-white h-full flex flex-col justify-between p-4">
      {/* User Section */}
      <div>
        <div className="p-4 flex items-center h-10">
          <Link to="/User">
            <img
              src={image}
              alt="User"
              className="w-10 h-7 sm:w-12 sm:h-9 rounded-full mr-2"
            />
          </Link>
          <h1 className="text-black text-sm sm:text-base mb-2 pt-3">
            Welcome, <span className="font-bold">{name}</span>
          </h1>
        </div>
        {/* Navigation Links */}
        <ul className="mt-0 text-gray-300">
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/" className="flex items-center px-3 w-full group-hover:text-black">
              <img
                src="/rebook-images/search-engine-1.png"
                alt="Browse Books"
                className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2"
              />
              Browse Books
            </Link>
          </li>
          <hr className="border-black" />
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/BorrowB" className="flex items-center px-3 group-hover:text-black">
              <img
                src="/rebook-images/Union.png"
                alt="Borrow Books"
                className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2"
              />
              Borrow Books
            </Link>
          </li>
          <hr className="border-black" />
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/History" className="flex items-center px-3 group-hover:text-black">
              <img
                src="/rebook-images/clock1.png"
                alt="History"
                className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2"
              />
              History
            </Link>
          </li>
          <hr className="border-black" />
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/logout" className="flex items-center px-3 group-hover:text-black">
              <img
                src="/rebook-images/sign-out-1.png"
                alt="Log Out"
                className="inline-block w-6 h-6 sm:w-8 sm:h-8 mr-2"
              />
              Log Out
            </Link>
          </li>
          <hr className="border-black" />
        </ul>
      </div>
      {/* Footer / Image Section */}
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

export default Sidebar;
