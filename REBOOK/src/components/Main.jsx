import Header from "./Landing/Header";
import Main from "./Landing/Main";
import background from "./assets/background.png";
import { useCallback, useState, useEffect } from "react";
import PropTypes from 'prop-types';

// LatestBooksEntry component
const LatestBooksEntry = ({ title, coverUrl }) => {
  return (
    <div className="flex flex-col items-center p-4 border rounded-lg bg-white">
      <img src={coverUrl} alt={title} className="h-64 w-64 object-cover rounded-md" /> {/* Increased height of the image */}
      <div className="mt-2 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}

LatestBooksEntry.propTypes = {
  coverUrl: PropTypes.string
}

const Landing = () => {

    const [active, setActive] = useState("");
    const onChange = useCallback((act) => {
        setActive(act);
    }, [setActive]);

    const [latestBooksData, setLatestBooksData] = useState([]);

    useEffect(() => {
        const load = async () => {
            const response  = await fetch("/api/v1/books?sort=latest", { method: "GET" });
            const data = await response.json();
            setLatestBooksData(data);
        }

        load();
    }, []);

    return (
        <div 
            style={{ 
                backgroundImage: `linear-gradient(rgba(0, 100, 0, 0.3), rgba(0, 100, 0, 0.3)), url(${background})`,
                minHeight: '500vh', // Ensure it covers the entire viewport height
                width: '100%',
                backgroundSize: 'cover', // Adjust to ensure the background image covers the entire width and height
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top',
                overflow: 'auto'
            }} 
            className="flex flex-col w-full sm:w-full md:w-full lg:w-full xl:w-full"
        >
            <Header onChange={onChange}/>
            <Main active={active} />
            <div className="flex flex-col items-center" style={{ marginTop: '850px' }}> {/* Add margin-top for spacing */}
                <div className="relative p-6 rounded-2xl shadow-lg flex-1 mb-4 mx-4 overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', maxWidth: 'calc(100% - 32px)' }}> {/* Black background with 50% opacity and margin */}
                    <div className="overflow-x-auto max-h-full">
                        <div className="flex space-x-9 justify-center">
                            {latestBooksData.map((book, index) => (
                                <LatestBooksEntry  
                                    key={index} 
                                    title={book.title} 
                                    coverUrl={`/api/v1/file/${book.cover}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Main.propTypes = {
    active: PropTypes.string.isRequired,
};

export default Landing;
