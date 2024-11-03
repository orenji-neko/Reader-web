import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa';

// Sample books data
const booksData = [
  { id: 1, title: "Blink", author: "Malcolm Gladwell", category: "Fiction", cover: "/rebook-images/blink.png", link: "/books/blink" },
  { id: 2, title: "Hold Still", author: "Author 3", category: "Non-Fiction", cover: "/rebook-images/hold.png", link: "/books/holdstill" },
  { id: 3, title: "Circle", author: "Madeline Miller", category: "Fiction", cover: "/rebook-images/circle.png", link: "/books/circle" },
  { id: 4, title: "1984", author: "George Orwell", category: "Fiction", cover: "/rebook-images/1984.png", link: "/books/1984" },
  { id: 5, title: "Slow Down", author: "Rachelle Williams", category: "Science", cover: "/rebook-images/slow.png", link: "/books/slow" },
  { id: 6, title: "Solitaire", author: "Alice Oseman", category: "Mystery", cover: "/rebook-images/solitaire.png", link: "/books/solitaire" },
  { id: 7, title: "Sunstroke", author: "Author 3", category: "Fiction", cover: "/rebook-images/sunstroke.png", link: "/books/sunstroke" },
  { id: 8, title: "Circles", author: "Madeline Miller", category: "Fiction", cover: "/rebook-images/circle.png", link: "/books/circles" },
  { id: 8, title: "Circles", author: "Madeline Miller", category: "Fiction", cover: "/rebook-images/circle.png", link: "/books/circles" },
  { id: 8, title: "Circles", author: "Madeline Miller", category: "Fiction", cover: "/rebook-images/circle.png", link: "/books/circles" },
  { id: 8, title: "Circles", author: "Madeline Miller", category: "Fiction", cover: "/rebook-images/circle.png", link: "/books/circles" },
  { id: 8, title: "Circles", author: "Madeline Miller", category: "Fiction", cover: "/rebook-images/circle.png", link: "/books/circles" },
  { id: 8, title: "Circles", author: "Madeline Miller", category: "Fiction", cover: "/rebook-images/circle.png", link: "/books/circles" },
  { id: 8, title: "Circles", author: "Madeline Miller", category: "Fiction", cover: "/rebook-images/circle.png", link: "/books/circles" },
  { id: 6, title: "Solitaire", author: "Alice Oseman", category: "Mystery", cover: "/rebook-images/solitaire.png", link: "/books/solitaire" },
  { id: 6, title: "Solitaire", author: "Alice Oseman", category: "History", cover: "/rebook-images/solitaire.png", link: "/books/solitaire" },
  { id: 6, title: "Solitaire", author: "Alice Oseman", category: "History", cover: "/rebook-images/solitaire.png", link: "/books/solitaire" },
  { id: 6, title: "Solitaire", author: "Alice Oseman", category: "History", cover: "/rebook-images/solitaire.png", link: "/books/solitaire" },



  // Add more unique books as needed...
];

const categories = ["Fiction", "Non-Fiction", "Science", "History", "Mystery"];

const Category = () => {
  const { categoryName } = useParams();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Filter books based on the selected category
  const filteredBooks = booksData.filter(book => {
    return book.category === categoryName && 
           (searchTerm === '' || 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
            book.author.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div className="bg-teal-100 flex flex-col w-full h-full min-h-screen">
      <div className="bg-teal-100 p-6 flex flex-col">
        {/* Search Bar and Categories Dropdown */}
        <div className="flex justify-between items-center max-w-2xl mb-2 space-x-4">
          <div className="flex items-center border border-gray-300 rounded-full p-2 bg-white flex-1">
            <FaSearch className="text-black mr-2" />
            <input
              type="text"
              placeholder="Search by title or author..."
              className="outline-none flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <FaTimes className="text-black cursor-pointer ml-2" onClick={clearSearch} />
            )}
          </div>
          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md flex items-center"
            >
              <span className="pr-2">Categories</span>
              <FaChevronDown className={`text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-md mt-1 w-48">
                <ul className="space-y-2 p-2">
                  {categories.map((category) => (
                    <li key={category} className="p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer">
                      <Link to={`/category/${category}`}>{category}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="px-2">
          <h1 className="text-2xl font-bold">{categoryName} Books</h1>

          {/* Books Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-2 overflow-y-auto w-full max-h-[500px] scrollbar-hidden">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <Link 
                  key={book.id} 
                  to={book.link} 
                  className="text-center bg-white w-full max-w-[120px] p-2 rounded-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="object-cover h-32 w-full rounded-md"
                  />
                  <h3 className="mt-2 text-sm font-bold">{book.title}</h3>
                  <p className="text-xs">{book.author}</p>
                </Link>
              ))
            ) : (
              <div className="flex justify-center items-center min-h-[100px] w-full">
                <p className="text-center text-gray-500">No books available in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
