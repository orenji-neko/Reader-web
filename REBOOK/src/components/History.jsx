import React, { useState, useRef } from 'react';
import { FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa'; // Ensure react-icons is installed
import { Link } from "react-router-dom";

const History = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const latestBooksData = [
    { id: 2, title: "Book Title 2", dateborrowed: "09/19/2024", cover: "/rebook-images/blink.png", duedate: "09/20/2024"},
    { id: 3, title: "Book Title 3", dateborrowed: "09/20/2024", cover: "/rebook-images/hold.png", duedate: "09/21/2024"},
    { id: 4, title: "Book Title 4", dateborrowed: "09/21/2024", cover: "/rebook-images/slow.png", duedate: "09/22/2024"},
    { id: 5, title: "Book Title 5", dateborrowed: "09/22/2024", cover: "/rebook-images/solitaire.png", duedate: "09/23/2024"},
  ];

  const filteredBooks = latestBooksData.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="bg-teal-100 p-6 flex flex-col h-screen">
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
                <li className="p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer">Fiction</li>
                <li className="p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer">Non-Fiction</li>
                <li className="p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer">Science</li>
                <li className="p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer">History</li>
                <li className="p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer">Mystery</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Table Component */}
      <h2 className="text-2xl font-bold p-4">History</h2>
      <div className="relative bg-white p-1 rounded-md shadow-lg flex-1 mb-4 mx-2 overflow-hidden">
        <div
          className="overflow-y-scroll h-full scroll-hide mb-4"  // Added margin-bottom here
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th className="p-4 border-b border-gray-300">Cover Image</th>
                <th className="p-4 border-b border-gray-300">Title</th>
                <th className="p-4 border-b border-gray-300">Date Borrowed</th>
                <th className="p-4 border-b border-gray-300">Due Date</th>
                <th className="p-4 border-b border-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td className="p-4 border-b border-gray-200">
                    <img src={book.cover} alt={book.title} className="h-16 w-16 object-cover rounded-md" />
                  </td>
                  <td className="p-4 border-b border-gray-200">{book.title}</td>
                  <td className="p-4 border-b border-gray-200">{book.dateborrowed}</td>
                  <td className="p-4 border-b border-gray-200">{book.duedate}</td>
                  <td>
                    <Link to="/BorrowB" className="flex items-center px-3 group-hover:text-black">
                      <u>Manage</u>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
