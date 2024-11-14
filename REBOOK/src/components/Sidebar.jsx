import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Using React Router's Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the solid user icon
import { useAuth } from "../utils/AuthProvider";

function Sidebar() {
  const [image, setImage] = useState(""); // Initialize state for user image
  const [name, setName] = useState("User"); // Initialize the state for name

  const { logout } = useAuth()

  // Load image and name from localStorage on component mount
  useEffect(() => {
    const storedImage = localStorage.getItem("userImage");
    const storedUserDetails = localStorage.getItem("userDetails");
    
    // Set the image from local storage if it exists
    if (storedImage) {
      setImage(storedImage);
    }

    // Set the name from local storage if it exists
    if (storedUserDetails) {
      const { name } = JSON.parse(storedUserDetails);
      setName(name);
    }
  }, []);

  return (
    <div className="w-[100%] bg-teal-500 text-white h-full flex flex-col justify-between p-4">
      {/* User Section */}
      <div>
        <div className="p-4 flex items-center h-10">
          <Link to="/user" className="flex items-center">
            {image ? (  
              <img
                src={image}
                alt="User"
                className="w-10 h-10 rounded-full mr-2" // Set dimensions for user image
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser} // Use the Font Awesome user icon
                className="w-12 h-12 text-white mr-2" // Style the Font Awesome icon
              />
            )}
          </Link>
          <h1 className="text-black text-sm sm:text-base mb-2 pt-3">
            Welcome, <span className="font-bold">{name}</span>
          </h1>
        </div>
        {/* Navigation Links */}
        <ul className="mt-0 text-gray-300">
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/reader" className="flex items-center px-3 w-full group hover:text-black">
              <img
                src="/src/assets/icons/search-engine.png"
                alt="Browse Books"
                className="inline-block mr-2 transition-transform duration-200 group-hover:scale-110"
              />
              <span className="transition-colors duration-200 group-hover:text-black">Browse Books</span>
            </Link>
          </li>
          <hr className="border-black" />
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/reader/borrow" className="flex items-center px-3 group-hover:text-black">
              <img
                src="/src/assets/icons/borrow.png"
                alt="Borrow Books"
                className="inline-block mr-2 transition-transform duration-200 group-hover:scale-110"
              />
              <span className="transition-colors duration-200 group-hover:text-black">Borrow Books</span>
            </Link>
          </li>
          <hr className="border-black" />
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link to="/reader/history" className="flex items-center px-3 group-hover:text-black">
              <img
                src="/src/assets/icons/clock.png"
                alt="History"
                className="inline-block mr-2 transition-transform duration-200 group-hover:scale-110"
              />
              <span className="transition-colors duration-200 group-hover:text-black">History</span>
            </Link>
          </li>
          <hr className="border-black" />
          <li className="group rounded py-2 hover:bg-teal-200">
            <Link className="flex items-center px-3 group hover:text-black" onClick={() => logout()}>
              <img
                src="/src/assets/icons/exit.png"
                alt="Log Out"
                className="mr-2 transition-transform duration-200 group-hover:scale-110"
                style={{ transform: "scaleX(-1)" }} // Flip image
              />
              <span className="transition-colors duration-200 group-hover:text-black">Log Out</span>
            </Link>
          </li>
          <hr className="border-black" />
        </ul>
      </div>
      {/* Footer / Image Section */}
      <div className="p-0">
        <img
          src="/rebook-images/bok1.png"
          alt="bgbook"
          className="w-40 h-30 sm:w-48 sm:h-36 mt-auto"
        />
      </div>
    </div>
  );
}

export default Sidebar;
