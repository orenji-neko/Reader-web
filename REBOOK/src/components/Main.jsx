import Header from "./Landing/Header";
import Main from "./Landing/Main"
import background from "./assets/background.png";
import { useCallback, useState } from "react";

const Landing = () => {

    const [active, setActive] = useState("");
    const onChange = useCallback((act) => {
        setActive(act);
    }, [setActive])

    return (
        <div 
            style={{ 
                backgroundImage: `linear-gradient(rgba(0, 100, 0, 0.3), rgba(0, 100, 0, 0.3)), url(${background})`,
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }} 
            className="flex flex-col w-full sm:w-full md:w-full lg:w-full xl:w-full h-screen"
        >
            <Header onChange={onChange}/>
            <Main active={active} />
        </div>
    );
}

export default Landing;
