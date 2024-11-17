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

const Sortable = ({ searchTerm }) => {
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter rows based on search term and selected status
  const filteredRows = TABLE_ROWS.filter(({ title, status }) => {
    const isTitleMatch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const isStatusMatch = selectedStatus === 'All' || status === selectedStatus;
    return isTitleMatch && isStatusMatch;
  });

  return (
    <div className="p-1">
      <div className="flex mr-5 mb-4 ">
        <button onClick={() => setSelectedStatus('Borrowed')} className={`px-4 py-1 rounded-md  ${selectedStatus === 'Borrowed' ? 'bg-gray-500 text-white' : 'bg-teal-300 text-black font-bold'}`}>
          Borrowed
        </button>
        <button onClick={() => setSelectedStatus('Pending')} className={`px-4 py-1 rounded-md  xl mx-2 ${selectedStatus === 'Pending' ? 'bg-gray-500 text-white' : 'bg-teal-300 text-black font-bold'}`}>
          Pending
        </button>
        <button onClick={() => setSelectedStatus('Approved')} className={`px-4 py-1 rounded-md ${selectedStatus === 'Approved' ? 'bg-gray-500 text-white' : 'bg-teal-300 text-black font-bold'}`}>
          Approved
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-2xl overflow-hidden">
          <thead className="sticky top-0 bg-gray-50 z-1">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="py-2 px-4 border-b bg-gray-50 text-left text-l font-bold text-gray-700">
                  {head}
                </th> 
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length > 0 ? (
              filteredRows.map(({ img, title, dateBorrowed, dueDate, status }, index) => (
                <tr key={index} className=" bg-white">
                  <td className="py-2 px-4 border-b">
                    <img src={img} alt={title} className="w-10 h-10 object-cover" />
                  </td>
                  <td className="py-2 px-4 border-b">{title}</td>
                  <td className="py-2 px-4 border-b">{dateBorrowed}</td>
                  <td className="py-2 px-4 border-b">{dueDate}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status === "Approved" ? "bg-green-200 text-green-800" : status === "Pending" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>
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
};

export default Sortable;
