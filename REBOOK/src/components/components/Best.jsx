import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import background from "../assets/background_1.png";

// LatestBooksEntry component
const LatestBooksEntry = ({ title, author, coverUrl, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="flex flex-col items-center p-2 border rounded-lg bg-white shadow-xl cursor-pointer hover:shadow-2xl transition-shadow" 
      style={{ width: '90px', height: '170px' }}
    >
      <img src={coverUrl} alt={title} className="h-32 w-full object-cover rounded-md" style={{ height: '100px', width: '80px' }} />
      <div className="mt-1 text-center">
        <h4 className="text-xs font-bold">{title}</h4>
        <h4 className="text-xs truncate" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80px' }}>
          By: {author}
        </h4>
      </div>
    </div>
  );
}
LatestBooksEntry.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  coverUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

// StarRating component
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i} className="text-yellow-500">&#9733;</span>); // filled star
    } else {
      stars.push(<span key={i} className="text-yellow-500">&#9734;</span>); // empty star
    }
  }
  return <div>{stars}</div>;
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

const Best = () => {
  const [latestBooksData, setLatestBooksData] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/v1/books?sort=latest", { method: "GET" });
      const data = await response.json();
      setLatestBooksData(data);
    }

    load();
  }, []);

  const handleRemoveSelectedBook = () => {
    setSelectedBook(null);
  };

  return (
    <div id="books-section" // Add ID for smooth scroll
      style={{
        backgroundImage: `linear-gradient(rgba(0, 100, 0, 0.3), rgba(0, 100, 0, 0.3)), url(${background})`,
        minHeight: '100vh', // Ensure it covers the entire viewport height
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
      }}
    >
      <div className="flex justify-left items-center my-1">
        <h1 className="text-3xl font-extrabold text-red-100 mt-2"> &nbsp; &nbsp; &nbsp;POPULAR BOOKS OF SEPTEMBER</h1>
      </div>
      <div className="flex flex-col w-full md:flex-row">
        <div className="relative p-4 rounded-2xl shadow-xl mx-4 overflow-hidden" style={{ flex: 1, marginLeft: '30px', }}>
          <div className="overflow-x-auto max-h-full">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              {latestBooksData.map((book, index) => (
                <LatestBooksEntry
                  key={index}
                  title={book.title}
                  author={book.author?.name}
                  coverUrl={`/api/v1/file/${book.cover}`}
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-left items-center my-1">
            <h1 className="text-3xl font-extrabold text-red-100 ">TRENDING BOOKS</h1>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {latestBooksData.map((book, index) => (
              <LatestBooksEntry
                key={index}
                title={book.title}
                author={book.author?.name}
                coverUrl={`/api/v1/file/${book.cover}`}
                onClick={() => setSelectedBook(book)}
              />
            ))}
          </div>
        </div>
        {selectedBook && (
          <div className="relative p-4 bg-white shadow-xl rounded-2xl flex flex-col items-center hover:shadow-xl transition-shadow" style={{ height: '126vh', width: '30vw', marginRight: '80px' }}>
            <button onClick={handleRemoveSelectedBook} className="absolute top-2 right-2 text-gray-500 font-bold hover:text-black">
              &#x2715;
            </button>
            <img src={`/api/v1/file/${selectedBook.cover}`} alt={selectedBook.title} className="object-cover rounded-md" style={{ height: '35%', width: '50%' }} />
            <h2 className="text-3xl font-bold mb-2">{selectedBook.title}</h2>
            <p className="text-lg font-medium mb-1 truncate" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80%' }}>{selectedBook.author?.name}</p>
            <p className="text-lg font-medium mb-1">{selectedBook.category?.name}</p>
            <StarRating rating={selectedBook.rating} />
            <div className="w-full text-left my-1">
              <h3 className="font-bold">Description</h3>
            </div>
            <p className="text-sm mb-2 border border text-justify border-black p-2 rounded-3xl" style={{ width: '100%', height: '35%', overflowY: 'auto' }}>&nbsp;&nbsp;&nbsp;&nbsp;{selectedBook.description}</p>
            <a href="/login" className="mt-2 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">Borrow</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Best;
