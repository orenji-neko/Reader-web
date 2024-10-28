import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Pics({ searchTerm }) {
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation
  
  const books = [
    { 
      id: 1, 
      title: "Blink", 
      author: "Malcolm Gladwell", 
      cover: "/rebook-images/blink.png",
      link: "/books/blink" // This will be used to navigate
    },
    { 
      id: 2, 
      title: "Hold Still", 
      author: "Author 3", 
      cover: "/rebook-images/hold.png",
      link: "/books/holdstill"
    },
    { 
      id: 3, 
      title: "Slow Down", 
      author: "Rachelle Williams", 
      cover: "/rebook-images/slow.png",
      link: "/books/slow"
    },
    { 
      id: 4, 
      title: "Solitaire", 
      author: "Alice Oseman", 
      cover: "/rebook-images/solitaire.png",
      link: "/books/solitaire"
    },
    { 
      id: 5, 
      title: "1984", 
      author: "Georg Orwell", 
      cover: "/rebook-images/1984.png",
      link: "/books/1984"
    },
    { 
      id: 6, 
      title: "Circle", 
      author: "Madeline Miller", 
      cover: "/rebook-images/circle.png",
      link: "/books/circle"
    },
    { 
      id: 7, 
      title: "Sunsstroke", 
      author: "Author 3", 
      cover: "/rebook-images/sunstroke.png",
      link: "/books/sunstroke"
    },
    { 
      id: 8, 
      title: "Circles", 
      author: "Madeline Mille", 
      cover: "/rebook-images/circle.png",
      link: "/books/circles"
    },
    { 
      id: 9, 
      title: "Book Title 3", 
      author: "Author 3", 
      cover: "/rebook-images/hold.png",
      link: "/books/book-title-3"
    },
    { 
      id: 10, 
      title: "Book Title 3", 
      author: "Author 3", 
      cover: "/rebook-images/hold.png",
      link: "/books/book-title-3"
    },
    { 
      id: 11, 
      title: "Book Title 3", 
      author: "Recamel", 
      cover: "/rebook-images/1984.png",
      link: "/books/book-title-3"
    },


    // Additional books...
  ];

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookClick = (book) => {
    // Navigate to the book's detail page using the book's link
    navigate(book.link);
  };

  return (
    <div>
      <div className="px-2">
        <div className="flex items-center mb-2">
          <h2 className="text-2xl font-bold">Popular Books</h2>
        </div>
        <div className="min-w-[300px] max-w-full overflow-x-auto scroll-hide snap-start flex space-x-10 p-2">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book.id}
                className="flex-shrink-0 text-center bg-white p-2 rounded-md hover:shadow-2xl transition-shadow duration-900 cursor-pointer"
                onClick={() => handleBookClick(book)} // Handle book click to navigate
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
