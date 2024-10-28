import React, { useState } from 'react';

// Table headers
const TABLE_HEAD = [
  "Image Cover",
  "Title",
  "Date Borrowed",
  "Due Date",
  "Status",
  "Actions",
];

// Table rows data
const TABLE_ROWS = [
  {
    img: "/rebook-images/circle.png",
    title: "Book Title 1",
    dateBorrowed: "2023-09-12",
    dueDate: "2023-10-12",
    status: "Pending",
  },
  {
    img: "/rebook-images/solitaire.png",
    title: "Book Title 2",
    dateBorrowed: "2023-08-20",
    dueDate: "2023-09-20",
    status: "Approved",
  },
  {
    img: "/rebook-images/sunstroke.png",
    title: "Book Title 3",
    dateBorrowed: "2023-07-10",
    dueDate: "2023-08-10",
    status: "Pending",
  },
  {
    img: "/rebook-images/1984.png",
    title: "Book Title 4",
    dateBorrowed: "2023-07-10",
    dueDate: "2023-08-10",
    status: "Pending",
  },
  {
    img: "/rebook-images/1984.png",
    title: "Book Title 5",
    dateBorrowed: "2023-07-10",
    dueDate: "2023-08-10",
    status: "Pending",
  },
  {
    img: "/rebook-images/1984.png",
    title: "Book Title 5",
    dateBorrowed: "2023-07-10",
    dueDate: "2023-08-10",
    status: "Borrowed",
  },
  {
    img: "/rebook-images/1984.png",
    title: "Book Title 6",
    dateBorrowed: "2023-07-10",
    dueDate: "2023-08-10",
    status: "Pending",
  },
  {
    img: "/rebook-images/1984.png",
    title: "Book Title 9",
    dateBorrowed: "2023-07-10",
    dueDate: "2023-08-10",
    status: "Pending",
  },
  {
    img: "/rebook-images/1984.png",
    title: "Book Title 8",
    dateBorrowed: "2023-07-10",
    dueDate: "2023-08-10",
    status: "Pending",
  },
  // Add more rows here if needed
];

export function Sortable({ searchTerm }) {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter rows based on search term and selected status
  const filteredRows = TABLE_ROWS.filter(({ title, status }) => {
    const isTitleMatch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const isStatusMatch = selectedStatus === 'All' || status === selectedStatus;
    return isTitleMatch && isStatusMatch;
  });

  // Handle status filter change
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="overflow-auto max-h-80">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="sticky top-0 bg-gray-50 z-1   0">
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className={`py-2 px-4 border-b bg-gray-50 text-left text-sm font-semibold text-gray-700 ${index === TABLE_HEAD.length - 1 ? 'relative' : ''}`}
                >
                  {head}
                  {/* Add icon for the last column (Actions) */}
                  {index === TABLE_HEAD.length - 1 && (
                    <div className="absolute right-2 top-2">
                      <button 
                        onClick={() => setDropdownOpen(!dropdownOpen)} 
                        className="focus:outline-none"
                      >
                        {/* Filter Icon (You can replace this with an SVG or Font Awesome icon) */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      {dropdownOpen && (
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded shadow-lg z-30">
                          <select
                            value={selectedStatus}
                            onChange={handleStatusChange}
                            className="border border-gray-300 rounded-md p-2 w-full"
                          >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Borrowed">Borrowed</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map(({ img, title, dateBorrowed, dueDate, status }, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <img src={img} alt={title} className="w-10 h-10 object-cover" />
                  </td>

                  <td className="py-2 px-4 border-b">
                    {title}
                  </td>

                  <td className="py-2 px-4 border-b">
                    {dateBorrowed}
                  </td>

                  <td className="py-2 px-4 border-b">
                    {dueDate}
                  </td>

                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${status === "Approved" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                      {status}
                    </span>
                  </td>

                  <td className="py-2 px-4 border-b">
                    <button className="text-blue-600 hover:underline mr-4">Return</button>
                    <button className="text-red-600 hover:underline">Cancel</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sortable;
