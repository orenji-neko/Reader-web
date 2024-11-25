import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; // Import FaTimes for the close button
import { useAuth } from '../utils/AuthProvider';

function Notif({ onClose }) { // Add onClose prop
  const [isClosing, setIsClosing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { token } = useAuth();

  const [status, setStatus] = useState("LOADING");

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    const outId = setTimeout(async () => {
      const response = await fetch("/api/v1/notification", {
        method: "GET",
        headers: {
          "Authorization": token
        }
      })
      const result = await response.json();
      setNotifications(result);

      result.length > 0 ?
        setStatus("ACTIVE")
      :
        setStatus("NONE")
    }, 1000);

    return () => clearTimeout(outId);
  }, [token]);

  return (
    <div className={`absolute top-0 right-0 m-4 bg-[#CCFBF1] p-3 rounded-2xl shadow-lg w-80 ${isClosing ? 'scale-out-top-right' : 'scale-in-top-right'}`}>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-bold text-center w-full">NOTIFICATION</h1>
        <FaTimes className="cursor-pointer" onClick={handleClose} />
      </div>
      <hr className="border-t-3 border-black mb-3 w-full" />
      <div className="overflow-y-auto max-h-48 custom-scrollbar"> 
        { status === "ACTIVE" ? 
            notifications.map((notif) => (
              <div key={notif.id} className="flex items-center justify-between border-b-2 border-gray py-1">
                <img src={`/api/v1/file/${notif.cover}`} className="h-10 w-10 object-cover rounded-md mr-2" alt="notification" />
                <div className="flex-1 text-center text-sm">
                  <p className="text-gray-700 text-sm">{notif.description}</p> 
                </div>
                <Link to="/reader/borrow" className="text-blue-500 hover:underline text-sm ml-2">Manage</Link>
              </div>))
          : status === "LOADING" ?
            <div className='flex items-center justify-center'>
              <p> Loading... </p>
            </div>
          :
            <div className='flex items-center justify-center'>
              <p> No notifications </p>
            </div>
        }
      </div>
      <hr className="border-t-3 border-black mt-3 w-full" />
    </div>
  );
}

export default Notif;
