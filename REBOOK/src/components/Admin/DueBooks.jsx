import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaChevronDown, FaFilter } from 'react-icons/fa';
import { formatDate } from '../../utils/date';

const statuses = ["All", "Pending", "Returned", "Overdue", "Available"];

const DueBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [overdueFilter, setOverdueFilter] = useState('All');
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const scrollRef = useRef(null);

  const [requests, setRequests] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  /**
   * Used for fetching data
   */
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/v1/requests/due");
      const result = await response.json();

      setRequestsData(result);
      console.log(result);
    }
    
    const fetchCategories = async () => {
      const response = await fetch("/api/v1/categories");
      const result = await response.json();

      setCategoriesData(result);
    }

    fetchCategories();
    fetchBooks();
  }, []);

  /**
   * Used for searching and filtering
   */
  useEffect(() => {
    // search
    const filteredRequests = requestsData.filter(request => {

      const matchesTerm = request.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.book.author.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !selectedCategory.id ? true : selectedCategory.id === request.book.categoryId;

      return matchesTerm && matchesCategory;
    });

    setRequests(filteredRequests);
    setCategories(categoriesData);
    
  }, [categories, categoriesData, requestsData, searchTerm, selectedCategory, selectedCategory.id]);

  // Toggle Filter Dropdown
  const toggleFilterDropdown = () => setFilterDropdownOpen(!isFilterDropdownOpen);

  // Clear Search
  const clearSearch = () => setSearchTerm('');

  // Handle Category, Status, and Overdue Filter changes
  const handleCategorySelect = (category) => setSelectedCategory(category);
  const handleStatusSelect = (status) => setSelectedStatus(status);
  const handleOverdueSelect = (overdue) => setOverdueFilter(overdue);

  return (
    <div className="bg-teal-100 flex flex-col w-full h-full min-h-screen">
      <div className="bg-teal-100 p-6 flex flex-col">
        {/* Search Bar */}
        <div className="flex justify-between items-center max-w-2xl mb-2 space-x-4">
          <div className="flex items-center border border-gray-300 rounded-full p-2 bg-white flex-1">
            <FaSearch className="text-black mr-2" />
            <input
              type="text"
              placeholder="Search by title or username..."
              className="outline-none flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <FaTimes className="text-black cursor-pointer ml-2" onClick={clearSearch} />
            )}
          </div>

          {/* Filter Dropdown */}
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
                {/* Categories Filter with Radio Buttons */}
                <div className="border-b border-gray-300">
                  <p className="p-2 font-medium">Categories</p>
                  {categories.map((category) => (
                    <label key={category.id} className="block p-2">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory.id === category.id}
                        onChange={() => handleCategorySelect(category)}
                        className="form-radio text-teal-600"
                      />
                      <span className="ml-2">{category.name}</span>
                    </label>
                  ))}
                </div>

                {/* Status Filter with Radio Buttons */}
                <div className="border-b border-gray-300">
                  <p className="p-2 font-medium">Status</p>
                  {statuses.map((status) => (
                    <label key={status} className="block p-2">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={selectedStatus === status}
                        onChange={() => handleStatusSelect(status)}
                        className="form-radio text-teal-600"
                      />
                      <span className="ml-2">{status}</span>
                    </label>
                  ))}
                </div>

                {/* Overdue Filter with Radio Buttons */}
                <div>
                  <p className="p-2 font-medium">Overdue</p>
                  <label className="block p-2">
                    <input
                      type="radio"
                      name="overdue"
                      value="1-5 Days"
                      checked={overdueFilter === '1-5 Days'}
                      onChange={() => handleOverdueSelect('1-5 Days')}
                      className="form-radio text-teal-600"
                    />
                    <span className="ml-2">1-5 Days</span>
                  </label>
                  <label className="block p-2">
                    <input
                      type="radio"
                      name="overdue"
                      value="More Than 5 Days"
                      checked={overdueFilter === 'More Than 5 Days'}
                      onChange={() => handleOverdueSelect('More Than 5 Days')}
                      className="form-radio text-teal-600"
                    />
                    <span className="ml-2">More Than 5 Days</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold p-4">Due Books</h2>
        <div className="relative bg-white p-4 rounded-2xl shadow-lg flex-1 mb-4 mx-2 overflow-hidden">
          <div className="overflow-y-auto max-h-full" ref={scrollRef}>
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="p-4 border-b border-gray-300 text-left">Cover</th>
                  <th className="p-4 border-b border-gray-300 text-left">Title</th>
                  <th className="p-4 border-b border-gray-300 text-left">Username</th>
                  <th className="p-4 border-b border-gray-300 text-right">Date Borrowed</th>
                  <th className="p-4 border-b border-gray-300 text-left">Due Date</th>
                  <th className="p-4 border-b border-gray-300 text-right">Overdue</th>
                  <th className="p-4 border-b border-gray-300 text-left">Status</th>
                  <th className="p-4 border-b border-gray-300 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.book.id}>
                    <td className="p-4 border-b border-gray-200">
                      <img src={`/api/v1/cover/${request.book.cover}`} alt={request.book.title} className="h-16 w-16 object-cover rounded-md" />
                    </td>
                    <td className="p-4 border-b border-gray-200">{request.book.title}</td>
                    <td className="p-4 border-b border-gray-200">{request.reader.username}</td>
                    <td className="p-4 border-b border-gray-200 text-center">{
                      request.borrowed ? formatDate(request.borrowed) : "No Borrowed Date"
                    }</td>
                    <td className="p-4 border-b border-gray-200 text-center">{formatDate(request.due)}</td>
                    <td className="p-4 border-b border-gray-200 text-center">{ request.overdue ? "Overdue" : "Not Overdue"}</td>
                    <td className={`p-4 border-b border-gray-200 ${request.book.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                      {request.book.status}
                    </td>
                    <td className="p-4 border-b border-gray-200 text-center">
                      <Link to={`/manage/${request.reader.username}`} className="underline">
                        View User
                      </Link>
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td className="p-4 text-center" colSpan="8">No books found.</td>
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

export default DueBooks;
