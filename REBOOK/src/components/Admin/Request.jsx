import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaChevronDown, FaFilter } from 'react-icons/fa';
import { useAuth } from '../../utils/AuthProvider';
import { formatDate } from "../../utils/date"

const statuses = ["APPROVED", "DENIED", "PENDING", "RETURNED"];

const Request = () => {
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const toggleFilterDropdown = () => setFilterDropdownOpen(!isFilterDropdownOpen);
  const clearSearch = () => setSearchTerm('');

  const [requests, setRequests] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  const { token } = useAuth();

  // Set up auto-fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestsResponse, categoriesResponse] = await Promise.all([
          fetch("/api/v1/requests", {
            method: "GET",
            headers: {
              "Authorization": token
            }
          }),
          fetch("/api/v1/categories", {
            method: "GET",
            headers: {
              "Authorization": token
            }
          })
        ]);

        const requestsResult = await requestsResponse.json();
        const categoriesResult = await categoriesResponse.json();

        setRequestsData(requestsResult);
        setCategoriesData(categoriesResult);
        console.log(categoriesResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Initial fetch
    fetchData();

    // Set up interval for fetching (every 30 seconds)
    const intervalId = setInterval(fetchData, 30000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array for initial setup

  // Handle filtering when search terms or filters change
  useEffect(() => {
    const filterData = (currentRequestsData) => {
      const filteredRequests = currentRequestsData.filter(request => {
        const matchesTerm = request.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          request.book.author.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = !selectedCategory.id ? true : selectedCategory.id === request.book.categoryId;

        const matchesStatus = selectedStatus === 'All' ? true : request.status === selectedStatus.toUpperCase();

        return matchesTerm && matchesCategory && matchesStatus;
      });

      setRequests(filteredRequests);
    };

    filterData(requestsData, categoriesData);
  }, [searchTerm, selectedCategory, selectedStatus, requestsData, categoriesData]);

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

  const approve = async (id) => {
    try {
      const response = await fetch(`/api/v1/request/approve/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": token
        }
      });

      const result = await response.json();
      alert("Approved!");
      // Fetch updated data immediately after approval
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deny = async (id) => {
    try {
      const response = await fetch(`/api/v1/request/deny/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": token
        }
      });

      const result = await response.json();
      alert("Denied!");
      // Fetch updated data immediately after denial
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const ret = async (id) => {
    try {
      const response = await fetch(`/api/v1/request/return/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": token
        }
      });

      const result = await response.json();
      alert("Returned!");
      // Fetch updated data immediately after denial
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Rest of the component remains the same...
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
                          <span>{category.name}</span>
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

        <h2 className="text-2xl font-bold p-4">Requests</h2>
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
                  <th className="p-4 border-b border-gray-300">Managed At</th>
                  <th className="p-4 border-b border-gray-300"></th>
                </tr>
              </thead>
              <tbody>
                {requests.length > 0 ? (
                  requests.map((request) => (
                    <tr key={request.id}>
                      <td className="p-4 border-b border-gray-200">
                        <img src={`/api/v1/file/${request.book.cover}`} alt={request.book.title} className="h-16 w-16 object-cover rounded-md" />
                      </td>
                      <td className="p-4 border-b border-gray-200">{request.book.title}</td>
                      <td className="p-4 border-b border-gray-200">{request.book.author.name}</td>
                      <td className="p-4 border-b border-gray-200">{request.reader.name}</td>
                      <td className={`p-4 border-b border-gray-200 ${
                        request.status === "PENDING" ? "text-yellow-400"    :  
                          request.status === "APPROVED" ? "text-green-400"  :
                            request.status === "DENIED" ? "text-red-400"    : 
                            "text-dark"
                      }`}>
                        {request.status}
                      </td>
                      <td className="p-4 border-b border-gray-200">
                        { formatDate(request.updatedAt) }
                      </td>
                      <td className="p-4 border-b border-gray-200 space-x-2">
                        {request.status === "PENDING" ? <>
                          <a className="underline text-green-500 hover:text-green-200"
                            onClick={() => approve(request.id)}
                          >
                            Approve
                          </a>
                          <a className="underline text-red-500 hover:text-red-200"
                            onClick={() => deny(request.id)}
                          >
                            Deny
                          </a>
                        </> : <> </> }
                        { request.status === "APPROVED" ? 
                          <a className="underline text-green-500 hover:text-green-200"
                            onClick={ () => ret(request.id) }
                          >
                            Returned
                          </a>
                          : <></>
                        }
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