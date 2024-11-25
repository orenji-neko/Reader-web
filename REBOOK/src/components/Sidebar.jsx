import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Using React Router's Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the solid user icon
import { useAuth } from "../utils/AuthProvider";

function Sidebar() {
  const [image, setImage] = useState(""); // Initialize state for user image
  const [name, setName] = useState("User"); // Initialize the state for name

  const { validate, logout, token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/v1/user/details", {
        method: "GET",
        headers: {
          "Authorization": token
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const result = await response.json();
      
      setName(result.username);
      setImage(result.profile ? result.profile : null);
    }

    fetchData();

  }, [validate]);
  return (
    <div className="w-[100%] bg-teal-500 text-white h-full flex flex-col justify-between p-4 border-r-2 border-teal-400">
      {/* User Section */}
      <div>
        <div className="p-6 flex items-center h-10">
          <Link to="/reader/user" className="flex items-center">
            {image ? (  
              <img
                src={`/api/v1/file/${image}`}
                alt="User"
                className="w-10 h-10 rounded-full mr-2" // Set dimensions for user image
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser} // Use the Font Awesome user icon
                className="w-9 h-9 items-left text-black mr-2 " // Style the Font Awesome icon
              />
            )}
          </Link>
          <h1 className="text-black mb-2 pt-3">
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
                style={{
                  filter: "brightness(0.1)", // Adjust the value to make the image darker
                }}
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
                style={{
                  filter: "brightness(0.1)", // Adjust the value to make the image darker
                }}
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
      <div style={{ position: "relative", height: "100vh" }}>
        <img
          src="/rebook-images/bok1.png"
          alt="bgbook"
          style={{
            width: "9rem",
            height: "9rem",
            filter: "brightness(0.2)", // Adjust the value to make the image darker
            position: "absolute",
            bottom: -12,
            left: -10
          }}
        />
      </div>


    </div>
  );
}

export default Sidebar;
