import { useState, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './App.css';
import PropTypes from 'prop-types';

function Pics({ searchTerm }) {
  const navigate = useNavigate();
  const { isSidebarOpen } = useOutletContext();
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default to 6 items per page
  const [resizeKey, setResizeKey] = useState(Date.now()); // Key for forcing re-render
  const [books, setPopularBooks] = useState([]);

  // Fetch books from API
  useEffect(() => {
    const load = async () => {
      const book_response = await fetch("/api/v1/books?sort=popular", { method: "GET" });
      const book_data = await book_response.json();

      setPopularBooks(book_data);
    }

    load();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth - 60;
      const bookWidth = 120; // Adjusted fixed width for book card
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
  }, [itemsPerPage, filteredBooks.length, startIndex]);

  const handleBookClick = (book) => {
    navigate(`/reader/books/${book.title.toLowerCase().replace(/ /g, '-')}`);
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
              <Link key={book.id} to={`/reader/book/${book.id}`}>
                <div
                  className="flex-shrink-0 text-center bg-white p-2 rounded-md hover:shadow-2xl transition-shadow duration-900 cursor-pointer"
                  onClick={() => handleBookClick(book)}
                  style={{ width: 132, height: 250 }} // Fixed width and height for book card
                >
                  <div style={{ padding: '9px' }}> {/* Added padding around the image */}
                    <img
                      src={`/api/v1/file/${book.cover}`}
                      alt={book.title}
                      className="object-cover h-32 w-full rounded-md" // Fixed height and width for image
                    />
                  </div>
                  <h3 className="ml-2 text-[15px] font-bold">{book.title}</h3>
                  <p className="p-2 text-[10px]">By {book.author ? book.author.name : ''}</p>
                </div>
              </Link>
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

Pics.propTypes = {
  searchTerm: PropTypes.string
}

export default Pics;
