import React, { useState, useRef } from 'react';
import { FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa'; // Ensure react-icons is installed
import { Link } from 'react-router-dom'; // Import Link for navigation
import Sortable from '../components/Sortable';

const BorrowB = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const categories = ["Fiction", "Non-Fiction", "Science", "History", "Mystery"]; // Define categories

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Handle drag scrolling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.pageY - scrollRef.current.offsetTop);
    setScrollTop(scrollRef.current.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const y = e.pageY - scrollRef.current.offsetTop;
    const walk = y - startY;
    scrollRef.current.scrollTop = scrollTop - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-teal-100 p-6 h-screen">
      {/* Search Bar and Categories Dropdown */}
      <div className="flex justify-between items-center max-w-2xl mb-2 space-x-4">
        <div className="flex items-center border border-gray-300 rounded-full p-2 bg-white flex-1">
          <FaSearch className="text-black mr-2" />
          <input
            type="text"
            placeholder="Search by title or author..."
            className="outline-none flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <FaTimes className="text-black cursor-pointer ml-2" onClick={clearSearch} />
          )}
        </div>

        {/* Categories Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md flex items-center"
          >
            <span className="pr-2">Categories</span>
            <FaChevronDown
              className={`text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-md mt-1 w-48">
              <ul className="space-y-2 p-2">
                {categories.map((category) => (
                  <li key={category} className="p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer">
                    <Link to={`/category/${category}`}>{category}</Link> {/* Wrap with Link */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-3xl font-bold p-4">Manage Borrowed Books</h2>
      {/* Table Component */}
      <div className="">
        <Sortable searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default BorrowB;
