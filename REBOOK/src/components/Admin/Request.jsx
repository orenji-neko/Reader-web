import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaChevronDown, FaFilter } from 'react-icons/fa';

const latestBooksData = [
  {
    id: 1,
    title: "Blink",
    author: "Malcolm Gladwell",
    cover: "/rebook-images/blink.png",
    reader: "Nicki Minaj",
    status: "Not Available",
    category: "Non-Fiction",
  },
  {
    id: 2,
    title: "Hold Still",
    author: "Author 3",
    cover: "/rebook-images/hold.png",
    reader: "Princess V",
    status: "Not Available",
    category: "Non-Fiction",
  },
  {
    id: 3,
    title: "Circle",
    author: "Madeline Miller",
    cover: "/rebook-images/circle.png",
    reader: "Angie Rose",
    status: "Not Available",
    category: "Fiction",
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    cover: "/rebook-images/1984.png",
    reader: "Jeralyn D.",
    category: "Fiction",
    status: "Available",
  },
  {
    id: 5,
    title: "Slow Down",
    author: "Rachelle Williams",
    category: "Science",
    cover: "/rebook-images/slow.png",
    status: "Available",
  },
];

const categories = ["All", "Fiction", "Non-Fiction", "Science", "History", "Mystery"];
const statuses = ["All", "Approved", "Denied", "Pending", "Blocked", "Available", "Not Available"];

const Request = () => {
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const toggleFilterDropdown = () => setFilterDropdownOpen(!isFilterDropdownOpen);
  const clearSearch = () => setSearchTerm('');

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryDropdownOpen(false);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setStatusDropdownOpen(false);
  };

  const filteredBooks = latestBooksData.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.reader.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesStatus = selectedStatus === "All" || book.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="bg-teal-100 flex flex-col w-full h-full min-h-screen">
      <div className="bg-teal-100 p-6 flex flex-col">
        <div className="flex justify-between items-center max-w-2xl mb-2 space-x-4">
          <div className="flex items-center border border-gray-300 rounded-full p-2 bg-white flex-1">
            <FaSearch className="text-black mr-2" />
            <input
              type="text"
              placeholder="Search by title, author, or reader..."
              className="outline-none flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <FaTimes className="text-black cursor-pointer ml-2" onClick={clearSearch} />
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleFilterDropdown}
              className="bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md flex items-center"
            >
              <FaFilter className="mr-2" />
              <span>Filter</span>
              <FaChevronDown className={`text-gray-500 transition-transform duration-300 ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isFilterDropdownOpen && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-md mt-1 w-48">
                <div className="border-b border-gray-300">
                  <button
                    onClick={() => setCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="flex justify-between items-center w-full p-2 hover:bg-gray-100"
                  >
                    <span>Categories</span>
                    <FaChevronDown className={`transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isCategoryDropdownOpen && (
                    <ul className="space-y-2 p-2">
                      {categories.map((category) => (
                        <li
                          key={category}
                          className="flex items-center space-x-2 p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer"
                          onClick={() => handleCategorySelect(category)}
                        >
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === category}
                            onChange={() => handleCategorySelect(category)}
                            className="w-4 h-4 text-teal-500"
                          />
                          <span>{category}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="border-b border-gray-300">
                  <button
                    onClick={() => setStatusDropdownOpen(!isStatusDropdownOpen)}
                    className="flex justify-between items-center w-full p-2 hover:bg-gray-100"
                  >
                    <span>Status</span>
                    <FaChevronDown className={`transition-transform duration-300 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isStatusDropdownOpen && (
                    <ul className="space-y-2 p-2">
                      {statuses.map((status) => (
                        <li
                          key={status}
                          className="flex items-center space-x-2 p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer"
                          onClick={() => handleStatusSelect(status)}
                        >
                          <input
                            type="radio"
                            name="status"
                            checked={selectedStatus === status}
                            onChange={() => handleStatusSelect(status)}
                            className="w-4 h-4 text-teal-500"
                          />
                          <span>{status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold p-4">Latest</h2>
        <div className="relative bg-white p-4 rounded-2xl shadow-lg flex-1 mb-4 mx-2 overflow-hidden">
          <div
            className="overflow-y-auto max-h-full"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="p-4 border-b border-gray-300">Cover Image</th>
                  <th className="p-4 border-b border-gray-300">Title</th>
                  <th className="p-4 border-b border-gray-300">Author</th>
                  <th className="p-4 border-b border-gray-300">Reader</th>
                  <th className="p-4 border-b border-gray-300">Status</th>
                  <th className="p-4 border-b border-gray-300"></th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book.id}>
                      <td className="p-4 border-b border-gray-200">
                        <img src={book.cover} alt={book.title} className="h-16 w-16 object-cover rounded-md" />
                      </td>
                      <td className="p-4 border-b border-gray-200">{book.title}</td>
                      <td className="p-4 border-b border-gray-200">{book.author}</td>
                      <td className="p-4 border-b border-gray-200">{book.reader}</td>
                      <td className={`p-4 border-b border-gray-200 ${book.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                        {book.status}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        <Link to={`/manage/${book.reader}`} className="underline">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-4 text-center" colSpan="6">No books found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
