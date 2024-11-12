import { useState } from "react";
import Logo from "../components/Logo";
import Search from "../components/Search";
import PropTypes from "prop-types";
import { useEffect } from "react";

const HeaderElement = ({ className = "", children }) => {
    return (
        <div className={`${className} flex-grow h-full`}>
            {children}
        </div>
    );
}

HeaderElement.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node
}

const Header = ({ onChange }) => {
    const [active, setActive] = useState("");

    useEffect(() => {
        onChange(active);

    }, [active, onChange])

    return (
        <header className="flex flex-row justify-evenly items-center space-x-4 p-3">
            <HeaderElement>
                <Logo/>
            </HeaderElement>

            <HeaderElement>
                <a className="text-xl text-white font-bold hover:underline" 
                    onClick={() => {setActive("books")}}
                    >
                    Books 
                </a>
            </HeaderElement>

            <HeaderElement className="">
                <a className="text-xl text-white font-bold hover:underline"
                    onClick={() => {setActive("aboutus")}}
                    > 
                    About Us 
                </a>
            </HeaderElement>

            <HeaderElement className="flex-grow">
                <Search />
            </HeaderElement>
            
            <HeaderElement>
                <a className="text-xl text-white font-bold hover:underline"> Login </a>
            </HeaderElement>

            <HeaderElement>
                <a className="text-xl text-white font-bold hover:underline"> Signup </a>
            </HeaderElement>
        </header>
    );
}
Header.propTypes = {
    onChange: PropTypes.func
}

export default Header;
