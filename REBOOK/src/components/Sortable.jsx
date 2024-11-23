import { useEffect, useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { formatDate } from '../utils/date';

const Sortable = ({ searchTerm }) => {
  const [selectedStatus, setSelectedStatus] = useState('PENDING');
  const { token } = useAuth();

  const [requestsData, setRequestsData] = useState([]);
  const [requests, setRequests] = useState([]);

  // Filter rows based on search term and selected status
  /*const filteredRows = TABLE_ROWS.filter(({ title, status }) => {
    const isTitleMatch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const isStatusMatch = selectedStatus === 'All' || status === selectedStatus;
    return isTitleMatch && isStatusMatch;
  });*/

  // fetch requests
  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch(`/api/v1/user/requests`, {
        headers: {
          "Authorization": token
        }
      });
      const result = await response.json();

      setRequestsData(result);
    }

    setInterval(fetchRequests, 2000);
  }, [selectedStatus, token]);

  useEffect(() => {
    const temp = requestsData.filter((req) => req.status === selectedStatus);
    setRequests(temp);
  }, [requestsData, selectedStatus]);

  return (
    <div className="p-1">
      <div className="flex mr-5 mb-4 ">
        <button onClick={() => setSelectedStatus('PENDING')} className={`px-4 py-1 rounded-md xl mx-1 ${selectedStatus === 'PENDING' ? 'bg-gray-500 text-white' : 'bg-teal-300 text-black font-bold'}`}>
          Pending
        </button>
        <button onClick={() => setSelectedStatus('APPROVED')} className={`px-4 py-1 rounded-md xl mx-1  ${selectedStatus === 'APPROVED' ? 'bg-gray-500 text-white' : 'bg-teal-300 text-black font-bold'}`}>
          Approved
        </button>
        <button onClick={() => setSelectedStatus('DENIED')} className={`px-4 py-1 rounded-md  xl mx-1 ${selectedStatus === 'DENIED' ? 'bg-gray-500 text-white' : 'bg-teal-300 text-black font-bold'}`}>
          Denied
        </button>
        <button onClick={() => setSelectedStatus('RETURNED')} className={`px-4 py-1 rounded-md  xl mx-1 ${selectedStatus === 'RETURNED' ? 'bg-gray-500 text-white' : 'bg-teal-300 text-black font-bold'}`}>
          Returned
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-2xl overflow-hidden">
          <thead className="sticky top-0 bg-gray-50 z-1">
            <tr>
              <th> Cover </th>
              <th> Title </th>
              <th> Date Borrowed </th>
              <th> Due Date </th>
              <th> Status </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request, index) => (
                <tr key={index} className=" bg-white">
                  <td className="py-2 px-4 border-b">
                    <img src={`/api/v1/file/${request.book.cover}`} alt={request.book.title} className="w-10 h-10 object-cover" />
                  </td>
                  <td className="py-2 px-4 border-b">{request.book.title}</td>
                  <td className="py-2 px-4 border-b">{formatDate(request.book.createdAt)}</td>
                  <td className="py-2 px-4 border-b">{request.due ? formatDate(request.due) : 'None'}</td>
                  <td className="py-2 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${request.status === "APPROVED" || request.status === "RETURNED" ? "bg-green-200 text-green-800" : request.status === "Pending" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {
                      (() => {
                        if(selectedStatus === "APPROVED") {
                          return <button className="text-blue-600 hover:underline mr-4">Return</button>
                        }
                      })()
                    }
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
