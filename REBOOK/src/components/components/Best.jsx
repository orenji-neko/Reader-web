import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
// LatestBooksEntry component
const LatestBooksEntry = ({ title, coverUrl }) => {
  return (
    <div className="flex flex-col items-center p-4 border rounded-lg bg-white">
      <img src={coverUrl} alt={title} className="h-64 w-60 object-cover rounded-md" />
      <div className="mt-2 text-center">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
}
LatestBooksEntry.propTypes = {
  title: PropTypes.string.isRequired,
  coverUrl: PropTypes.string.isRequired
}
const Best = () => {
    const [latestBooksData, setLatestBooksData] = useState([]);
    useEffect(() => {
        const load = async () => {
            const response = await fetch("/api/v1/books?sort=latest", { method: "GET" });
            const data = await response.json();
            setLatestBooksData(data);
        }
        load();
    }, []);
    return (
        <>
            <div>
                <h1 className="text-3xl font-extrabold text-red-100" style={{ marginTop: '233px', marginLeft: '312px', marginBottom: '40px' }}>BEST OF SEPTEMBER</h1> {/* Added marginBottom */}
            </div>
            <div className="flex flex-col w-full sm:w-full md:w-full lg:w-full xl:w-full">
                <div className="relative p-4 rounded-2xl shadow-lg flex-1 mb-4 mx-4 overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', maxWidth: '5000px' }}>
                    <div className="overflow-x-auto max-h-full">
                        <div className="flex space-x-4 justify-center">
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
            <div>
                <h1 className="text-3xl font-extrabold text-red-100" style={{ marginTop: '30px', marginLeft: '380px', marginBottom: '40px' }}>TRENDING</h1> {/* Added marginBottom */}
            </div>
            <div className="flex flex-col w-full sm:w-full md:w-full lg:w-full xl:w-full">
                <div className="relative p-4 rounded-2xl shadow-lg flex-1 mb-4 mx-4 overflow-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', maxWidth: '5000px' }}>
                    <div className="overflow-x-auto max-h-full">
                        <div className="flex space-x-4 justify-center">
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
        </>
    )
}
export default Best;
