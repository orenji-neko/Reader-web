import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaChevronDown, FaFilter } from 'react-icons/fa';
import { useAuth } from '../../utils/AuthProvider';
import { formatDate } from "../../utils/date"

const statuses = ["All", "Suspended", "Not Suspended"];
const dateFilters = ["Yesterday", "Last 7 Days", "Last 30 Days", "This Month"];

const Readers = () => {
  const { token } = useAuth()
  
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');

  const [filteredReaders, setFilteredReaders] = useState([]);
  const [readersData, setReadersData] = useState([]);

  const scrollRef = useRef(null);

  useEffect(() => {
    setInterval(async () => {
      const response = await fetch("/api/v1/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
      const result = await response.json()
      setReadersData(result)
    }, 1000);
  }, [token]);

  useEffect(() => {
    setFilteredReaders(() => {
      return readersData.filter((reader) => {
        const matchesSearch = reader.username.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === "All" || reader.readerStatus === selectedStatus;
        //const matchesDate = filterByDate(reader.dateRegistered);
        return matchesSearch && matchesStatus //&& matchesDate;
      })
    })

    

  }, [readersData, searchTerm, selectedStatus])

  const toggleFilterDropdown = () => setFilterDropdownOpen(!isFilterDropdownOpen);
  const clearSearch = () => setSearchTerm('');

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setFilterDropdownOpen(false);
  };

  const handleDateFilterSelect = (filter) => {
    setSelectedDateFilter(filter);
    setFilterDropdownOpen(false);
  };

  const filterByDate = (date) => {
    const dateRegistered = new Date(date);
    const today = new Date();
    switch (selectedDateFilter) {
      case "Yesterday":
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        return dateRegistered.toDateString() === yesterday.toDateString();
      case "Last 7 Days":
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        return dateRegistered >= sevenDaysAgo;
      case "Last 30 Days":
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        return dateRegistered >= thirtyDaysAgo;
      case "This Month":
        return dateRegistered.getMonth() === today.getMonth() && dateRegistered.getFullYear() === today.getFullYear();
      default:
        return true;
    }
  };

  return (
    <div className="bg-teal-100 flex flex-col w-full h-full min-h-screen">
      <div className="bg-teal-100 p-6 flex flex-col">
        <div className="flex justify-between items-center max-w-2xl mb-2 space-x-4">
          <div className="flex items-center border border-gray-300 rounded-full p-2 bg-white flex-1">
            <FaSearch className="text-black mr-2" />
            <input
              type="text"
              placeholder="Search by username..."
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
                <div className="border-b border-gray-300 p-2">
                  <span className="font-semibold">Status</span>
                  <ul className="space-y-2 mt-2">
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
                </div>
                <div className="p-2">
                  <span className="font-semibold">Date Registered</span>
                  <ul className="space-y-2 mt-2">
                    {dateFilters.map((filter) => (
                      <li
                        key={filter}
                        className="flex items-center space-x-2 p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer"
                        onClick={() => handleDateFilterSelect(filter)}
                      >
                        <input
                          type="radio"
                          name="dateFilter"
                          checked={selectedDateFilter === filter}
                          onChange={() => handleDateFilterSelect(filter)}
                          className="w-4 h-4 text-teal-500"
                        />
                        <span>{filter}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold p-4">Readers</h2>
        <div className="relative bg-white p-4 rounded-2xl shadow-lg flex-1 mb-4 mx-2 overflow-hidden">
          <div className="overflow-y-auto max-h-full" ref={scrollRef}>
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  <th className="p-4 border-b border-gray-300 text-left">Profile</th>
                  <th className="p-4 border-b border-gray-300 text-left">Username</th>
                  <th className="p-4 border-b border-gray-300 text-left">Date Registered</th>
                  <th className="p-4 border-b border-gray-300 text-right">Requests</th>
                  <th className="p-4 border-b border-gray-300 text-right">Borrowed</th>
                  <th className="p-4 border-b border-gray-300 text-right">Due Books</th>
                  <th className="p-4 border-b border-gray-300 text-left">Status</th>
                  <th className="p-4 border-b border-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReaders.length > 0 ? (
                  filteredReaders.map((reader) => (
                    <tr key={reader.id} className="hover:bg-teal-50">
                      <td className="p-4 border-b border-gray-200">
                        <img src={`/api/v1/file/${reader.profile}`} alt={reader.username} className="h-16 w-16 object-cover rounded-full" />
                      </td>
                      <td className="p-4 border-b border-gray-200">{reader.username}</td>
                      <td className="p-4 border-b border-gray-200 text-left">{ formatDate(reader.createdAt) }</td>
                      <td className="p-4 border-b border-gray-200 text-center">{}</td>
                      <td className="p-4 border-b border-gray-200 text-center">{reader.borrowedBooks}</td>
                      <td className="p-4 border-b border-gray-200 text-center">{reader.dueBooks}</td>
                      <td className={`p-4 border-b border-gray-200 ${reader.readerStatus === 'Suspended' ? 'text-red-600' : 'text-green-600'}`}>
                        {reader.readerStatus}
                      </td>
                      <td className="p-4 border-b border-gray-200 text-center">
                        <Link to={`/manage/${reader.username}`} className="text-teal-600 hover:underline">
                          View History
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-4 text-center" colSpan="8">No readers found.</td>
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

export default Readers;
