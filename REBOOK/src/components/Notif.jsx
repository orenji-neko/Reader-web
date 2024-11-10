import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; // Import FaTimes for the close button

const Notifications = [
  { id: 1, message: "You Borrow a Book ''blink'' ", main: "/rebook-images/solitaire.png" },
  { id: 2, message: "You Borrow a Book ''blink'' ", main: "/rebook-images/solitaire.png" },
  { id: 3, message: "You Borrow a Book ''blink'' ", main: "/rebook-images/solitaire.png" },
  { id: 4, message: "You Borrow a Book ''blink'' ", main: "/rebook-images/solitaire.png" },
  { id: 5, message: "You Borrow a Book ''blink'' ", main: "/rebook-images/solitaire.png" },
  { id: 6, message: "Reminder! Please return the book", main: "/rebook-images/default_profile.png" },
  { id: 7, message: "Reminder! Please return the book", main: "/rebook-images/default_profile.png" },
  { id: 8, message: "Reminder! Please return the book", main: "/rebook-images/default_profile.png" },
];

function Notif({ onClose }) { // Add onClose prop
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500); // Match this duration with the animation duration
  };

  return (
    <div className={`absolute top-0 right-0 m-4 bg-[#CCFBF1] p-3 rounded-2xl shadow-lg w-80 ${isClosing ? 'scale-out-top-right' : 'scale-in-top-right'}`}> {/* Conditional class for animation */}
      <div className="flex justify-between items-center mb-3"> {/* Adjusted margin */}
        <h1 className="text-xl font-bold text-center w-full">NOTIFICATION</h1>
        <FaTimes className="cursor-pointer" onClick={handleClose} /> {/* Close button with handleClose */}
      </div>
      <hr className="border-t-3 border-black mb-3 w-full" /> {/* Full-width line below NOTIFICATION */}
      <div className="overflow-y-auto max-h-48 custom-scrollbar"> {/* Adjusted max-height and custom scrollbar */}
        {Notifications.map((notif) => (
          <div key={notif.id} className="flex items-center justify-between border-b-2 border-gray py-1"> {/* Adjusted padding and justify-between */}
            <img src={notif.main} className="h-10 w-10 object-cover rounded-md mr-2" alt="notification" /> {/* Adjusted size */}
            <div className="flex-1 text-center text-sm"> {/* Centered and smaller text */}
              <p className="text-gray-700 text-sm">{notif.message}</p> {/* Smaller text */}
            </div>
            <Link to="/BorrowB" className="text-blue-500 hover:underline text-sm ml-2">Manage</Link> {/* Smaller text and aligned to right */}
          </div>
        ))}
      </div>
      <hr className="border-t-3 border-black mt-3 w-full" /> {/* Full-width line at the bottom of the box */}
    </div>
  );
}

export default Notif;
