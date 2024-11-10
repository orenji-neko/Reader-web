import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaSearch, FaTimes, FaChevronDown } from 'react-icons/fa';


const Category = () => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [booksData, setBooksData] = useState([]);
  const [categoriesData, setCategories] = useState([]);

  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        // Books
        const bookResponse = await fetch("/api/v1/books");
        const books = await bookResponse.json();
        
        // Categories
        const categoryResponse = await fetch("/api/v1/categories");
        const categories = await categoryResponse.json();
        
        setCategories(categories);
        
        const category = categories.find(value => value.id === parseInt(categoryId));
        if (category) {
          setCategoryName(category.name);
          setBooksData(books);
          setFilteredBooks(books.filter(book => book.categoryId === parseInt(categoryId)));
        } else {
          setFilteredBooks([]);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    load();
  }, [categoryId]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredBooks(booksData);
  };

  const searchHandler = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === '') {
      setFilteredBooks(booksData);
    } else {
      const fe = booksData.filter(book => {
        return book.categoryId === parseInt(categoryId) && 
               (term === '' || 
                book.title.toLowerCase().includes(term.toLowerCase()) || 
                book.author.name.toLowerCase().includes(term.toLowerCase()));
      });
      setFilteredBooks(fe);
    }
  }, [booksData, categoryId]);

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
              onChange={searchHandler}
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
                  {categoriesData && categoriesData.map((category, index) => (
                    <li key={index} className="p-2 bg-gray-100 rounded hover:bg-teal-600 hover:text-white cursor-pointer">
                      <Link to={`/category/${category.id}`}>{category.name}</Link>
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
            {filteredBooks.length > 0 ? filteredBooks.map((book) => (
                <Link 
                  key={book.id} 
                  to={`/book/${book.id}`} 
                  className="text-center bg-white w-full max-w-[120px] p-2 rounded-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                >
                  <img
                    src={`/api/v1/cover/${book.cover}`}
                    alt={book.title}
                    className="object-cover h-32 w-full rounded-md"
                  />
                  <h3 className="mt-2 text-sm font-bold">{book.title}</h3>
                  <p className="text-xs">{book.author.name}</p>
                </Link>
              ))
            :
              <div className="flex justify-center items-center min-h-[100px] w-full">
                <p className="text-center text-gray-500">No books available in this category.</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;