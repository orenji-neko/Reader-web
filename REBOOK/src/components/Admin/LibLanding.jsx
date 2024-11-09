import React, { useState, useRef } from 'react';
import { FaUser, FaBook, FaClock, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BiSolidBookAdd } from "react-icons/bi";

const popularBooksData = [
  {
    id: 1,
    title: "Blink",
    author: "Malcolm Gladwell",
    cover: "/rebook-images/blink.png",
    rating: 10,
    status: "Unavailable",
  },
  // Add more popular book data if necessary
];

const LibLanding = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setScrollTop(scrollRef.current.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    scrollRef.current.scrollTop = scrollTop - deltaY;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="bg-teal-100 flex flex-col w-full h-full min-h-screen">
      <h2 className="text-2xl font-bold p-6 pl-8">Dashboard</h2>
      
      {/* Main Content */}
      <div className="grid grid-cols-4 gap-4 px-8 mb-6">
        <Link to="/admin/request" className="bg-teal-500 text-white p-4 rounded-md flex items-center justify-center group hover:bg-teal-600">
          <FaClipboardList size={24} className="mr-2 text-black" />
          <span className="group-hover:text-black transition-colors duration-200">REQUEST</span>
        </Link>
        <Link to="/admin/users" className="bg-teal-500 text-white p-4 rounded-md flex items-center justify-center group hover:bg-teal-600">
          <FaUser size={24} className="mr-2 text-black" />
          <span className="group-hover:text-black transition-colors duration-200">USERS</span>
        </Link>
        <Link to="/admin/late-books" className="bg-teal-500 text-white p-4 rounded-md flex items-center justify-center group hover:bg-teal-600">
          <FaClock size={24} className="mr-2 text-black" />
          <span className="group-hover:text-black transition-colors duration-200">LATE BOOKS</span>
        </Link>
        <Link to="/admin/books" className="bg-teal-500 text-white p-4 rounded-md flex items-center justify-center group hover:bg-teal-600">
          <BiSolidBookAdd size={24} className="mr-2 text-black" />
          <span className="group-hover:text-black transition-colors duration-200">BOOK</span>
        </Link>
      </div>

      {/* Popular Books Section */}
      <h2 className="text-2xl font-bold p-6 pl-8">Popular Books</h2>
      <div className="bg-white p-1 rounded-md shadow-lg mx-8">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              <th className="p-4 border-b border-gray-300">Cover</th>
              <th className="p-4 border-b border-gray-300">Title</th>
              <th className="p-4 border-b border-gray-300">Rating</th>
              <th className="p-4 border-b border-gray-300">Author</th>
              <th className="p-4 border-b border-gray-300">Status</th>
              <th className="p-4 border-b border-gray-300"></th> {/* Placeholder for Manage column */}
            </tr>
          </thead>
          <tbody>
            {popularBooksData.map((book) => (
              <tr key={book.id}>
                <td className="p-4 border-b border-gray-200">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </td>
                <td className="p-4 border-b border-gray-200">{book.title}</td>
                <td className="p-4 border-b border-gray-200">{book.rating}</td>
                <td className="p-4 border-b border-gray-200">{book.author}</td>
                <td
                  className={`p-4 border-b border-gray-200 ${
                    book.status === "Available" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {book.status}
                </td>
                <td className="p-4 border-b border-gray-200">
                  <Link to={`/manage/${book.id}`} className="text-blue-500 underline">
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibLanding;
