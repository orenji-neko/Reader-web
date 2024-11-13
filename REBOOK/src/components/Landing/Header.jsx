import { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../components/Logo";
import Search from "../components/Search";

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
        <button
          className="text-xl text-white font-bold bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
          onClick={onLoginClick}
        >
          Login
        </button>
      </HeaderElement>

      <HeaderElement>
        <button
          className="text-xl text-white font-bold bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
          onClick={onRegisterClick}
        >
          Signup
        </button>
      </HeaderElement>
    </header>
  );
};

Header.propTypes = {
  onLoginClick: PropTypes.func,
  onRegisterClick: PropTypes.func,
};

export default Header;
