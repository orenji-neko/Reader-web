import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../components/Logo";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import navbar from "../assets/navbar.png";

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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ 
      backgroundImage: `linear-gradient(rgba(0, 100, 0, 0.3), rgba(0, 100, 0, 0.3)), url(${navbar})`,
      backgroundSize: 'cover',
    }}
    className="flex flex-col w-full sm:w-full md:w-full lg:w-full xl:w-full"
    >
      <header className="flex flex-row justify-evenly items-center space-x-4 p-3">
        <HeaderElement>
          <Logo />
        </HeaderElement>

        <HeaderElement>
          <a
            className="text-xl text-white font-bold hover:underline cursor-pointer"
            onClick={() => scrollToSection("books-section")}
          >
            Books
          </a>
        </HeaderElement>

        <HeaderElement>
          <a
            className="text-xl text-white font-bold hover:underline cursor-pointer"
            onClick={() => scrollToSection("aboutus-section")}
          >
            About Us
          </a>
        </HeaderElement>

        <HeaderElement className="flex-grow">
          <Search />
        </HeaderElement>

        <HeaderElement>
          <Link to="/login" className="text-xl text-white font-bold hover:underline">
            Login
          </Link>
        </HeaderElement>

        <HeaderElement>
          <Link to="/register" className="text-xl text-white font-bold hover:underline">
            Signup
          </Link>
        </HeaderElement>
      </header>
    </div>
  );
};

Header.propTypes = {
  onLoginClick: PropTypes.func,
  onRegisterClick: PropTypes.func,
};

export default Header;
