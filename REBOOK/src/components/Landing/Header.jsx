import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../components/Logo";
import Search from "../components/Search";
import { Link } from "react-router-dom";

const HeaderElement = ({ className = "", children }) => {
  return (
    <div className={`${className} flex-grow h-full`}>
      {children}
    </div>
  );
};

HeaderElement.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const Header = ({ onLoginClick, onRegisterClick }) => {
  const [active, setActive] = useState("");

  return (
    <header className="flex flex-row justify-evenly items-center space-x-4 p-3">
      <HeaderElement>
        <Logo />
      </HeaderElement>

      <HeaderElement>
        <a
          className="text-xl text-white font-bold hover:underline"
          onClick={() => setActive("books")}
        >
          Books
        </a>
      </HeaderElement>

      <HeaderElement>
        <a
          className="text-xl text-white font-bold hover:underline"
          onClick={() => setActive("aboutus")}
        >
          About Us
        </a>
      </HeaderElement>

      <HeaderElement className="flex-grow">
        <Search />
      </HeaderElement>

      <HeaderElement>
        <Link to="/login" className="text-xl text-white font-bold hover:underliner">
          Login
          </Link>
      </HeaderElement>

      <HeaderElement>
      <Link to="/register" className="text-xl text-white font-bold hover:underliner">
          Signup
          </Link>
      </HeaderElement>
    </header>
  );
};


{/* <Link to="/user" className="flex items-center">
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
          </Link> */}
Header.propTypes = {
  onLoginClick: PropTypes.func,
  onRegisterClick: PropTypes.func,
};

export default Header;
