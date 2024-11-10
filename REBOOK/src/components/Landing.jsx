import { useState, useRef, useEffect } from 'react';
import Pics from './Pics';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa';
import PropTypes from 'prop-types';

const LatestBooksTableEntry = ({ title, coverUrl, rating, author, status }) => {
  return (
    <tr>
      <td className="p-4 border-b border-gray-200">
        <img src={coverUrl} alt={title} className="h-16 w-16 object-cover rounded-md" />
      </td>
      <td className="p-4 border-b border-gray-200">{title}</td>
      <td className="p-4 border-b border-gray-200">{rating}</td>
      <td className="p-4 border-b border-gray-200">{author ? author : "" }</td>
      <td className={`p-4 border-b border-gray-200 ${status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
        {status}
      </td>
    </tr>
  )
}
LatestBooksTableEntry.propTypes = {
  title: PropTypes.string,
  rating: PropTypes.number,
  author: PropTypes.string,
  status: PropTypes.string,
  coverUrl: PropTypes.string
}

const Landing = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const [latestBooksData, setLatestBooksData] = useState([]);
  const [categories, setCategories] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // don't touch
  useEffect(() => {
    /*
     *  [GET] /api/v1/books
     */
    const load = async () => {
      const book_response  = await fetch("/api/v1/books?sort=latest", { method: "GET" });
      const book_data = await book_response.json();

      const category_response  = await fetch("/api/v1/categories", { method: "GET" });
      const category_data = await category_response.json();


      setLatestBooksData(await book_data);
      setCategories(await category_data);
    }

    load();
  }, [setLatestBooksData]) // 5 sec

  return (
    <div className="bg-teal-100 flex flex-col w-full h-full min-h-screen">
      <div className="bg-teal-100 p-6 flex flex-col">
        <div>
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
                <FaChevronDown className={`text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-md mt-1 w-48">
                <ul className="space-y-2 p-2">
                  {categories.map((category, index) => (
                    <li key={index} className="p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer">
                      <Link to={`/category/${category.id}`}>{category.name}</Link> {/* Wrap with Link */}
                    </li>
                  ))}
                </ul>
              </div>
              )}
            </div>
          </div>
          <Pics searchTerm={searchTerm} />
        </div>
        <h2 className="text-2xl font-bold p-4">Latest</h2>
        <div className="relative bg-white p-4 rounded-2xl shadow-lg flex-1 mb-4 mx-2 overflow-hidden">
          <div
            className="overflow-y-auto max-h-full"
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
                  <th className="p-4 border-b border-gray-300">Rating</th>
                  <th className="p-4 border-b border-gray-300">Author</th>
                  <th className="p-4 border-b border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestBooksData.map((book, index) => (
                  <LatestBooksTableEntry  
                    key={index} 
                    title={book.title} 
                    rating={book.rating}
                    author={book.author ? book.author.name : ""}
                    status={book.status}
                    coverUrl={`/api/v1/cover/${book.cover}`}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
