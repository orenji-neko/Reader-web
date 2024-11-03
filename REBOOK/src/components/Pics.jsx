import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './App.css';

function Pics({ searchTerm }) {
  const navigate = useNavigate();
  const { isSidebarOpen } = useOutletContext();
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default to 6 items per page
  const [resizeKey, setResizeKey] = useState(Date.now()); // Key for forcing re-render

  const books = [
    { id: 1, title: "Blink", author: "Malcolm Gladwell", cover: "/rebook-images/blink.png", link: "/books/blink" },
    { id: 2, title: "Hold Still", author: "Author 3", cover: "/rebook-images/hold.png", link: "/books/holdstill" },
    { id: 3, title: "Slow Down", author: "Rachelle Williams", cover: "/rebook-images/slow.png", link: "/books/slow" },
    { id: 4, title: "Solitaire", author: "Alice Oseman", cover: "/rebook-images/solitaire.png", link: "/books/solitaire" },
    { id: 5, title: "1984", author: "George Orwell", cover: "/rebook-images/1984.png", link: "/books/1984" },
    { id: 6, title: "Circle", author: "Madeline Miller", cover: "/rebook-images/circle.png", link: "/books/circle" },
    { id: 7, title: "Sunsstroke", author: "Author 3", cover: "/rebook-images/sunstroke.png", link: "/books/sunstroke" },
    { id: 8, title: "Circles", author: "Madeline Miller", cover: "/rebook-images/circle.png", link: "/books/circles" },
    { id: 9, title: "Book Title 3", author: "Author 3", cover: "/rebook-images/hold.png", link: "/books/book-title-3" },
    { id: 10, title: "Book Title 3", author: "Author 3", cover: "/rebook-images/hold.png", link: "/books/book-title-3" },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const bookWidth = 100; // Simplified, since the value doesn't change based on sidebar state
      const effectiveWidth = screenWidth - (isSidebarOpen ? 256 : 0); // Adjust effective width based on sidebar visibility
      const padding = 40; // Assumed padding around book cards in pixels
      const items = Math.floor(effectiveWidth / (bookWidth + padding));
      setItemsPerPage(items);
      setResizeKey(Date.now()); // Force re-render by updating key
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize); // Add resize listener

    // Cleanup listener
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  // Sync startIndex with itemsPerPage and filteredBooks length
  useEffect(() => {
    const totalItems = filteredBooks.length;
    const maxStartIndex = Math.max(0, totalItems - itemsPerPage);
    setStartIndex(Math.min(startIndex, maxStartIndex));
  }, [itemsPerPage, filteredBooks.length]);

  const handleBookClick = (book) => {
    navigate(book.link);
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < filteredBooks.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    const prevStartIndex = startIndex - itemsPerPage;
    if (prevStartIndex >= 0) {
      setStartIndex(prevStartIndex);
    } else {
      setStartIndex(0);
    }
  };

  return (
    <div key={resizeKey} className="relative">
      <div className="px-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">Popular Books</h2>
          <div className="flex space-x-2">
            <button onClick={handlePrev} disabled={startIndex === 0} className="text-xl text-gray-500 hover:text-gray-700">
              <FaArrowLeft />
            </button>
            <button onClick={handleNext} disabled={startIndex + itemsPerPage >= filteredBooks.length} className="text-xl text-gray-500 hover:text-gray-700">
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="min-w-[300px] max-w-full overflow-x-auto scroll-hide snap-start flex space-x-10 p-2">
          {filteredBooks.length > 0 ? (
            filteredBooks.slice(startIndex, startIndex + itemsPerPage).map((book) => (
              <div
                key={book.id}
                className="flex-shrink-0 text-center bg-white p-2 rounded-md hover:shadow-2xl transition-shadow duration-900 cursor-pointer"
                onClick={() => handleBookClick(book)}
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="object-cover h-24 rounded-md"
                />
                <h3 className="mt-2 text-[12px] font-bold">{book.title}</h3>
                <p className="text-[10px]">{book.author}</p>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center min-h-[100px] w-full">
              <p className="text-center text-gray-500">No books found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Pics;
