import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookDetails() {
  const { bookId } = useParams(); // Get the book title from the URL
  const navigate = useNavigate(); // Hook to navigate back

  const [book, setBook] = useState(null); // book details

  useEffect(() => {
    const load = async () => {
      const book_response = await fetch(`/api/v1/book/${bookId}`, { method: "GET" });
      const book_result = await book_response.json();
      setBook(await book_result);
    }

    load();
    console.log(book);
  }, [book, bookId]);

  if (!book) {
    return <p>Book not found!</p>; // Handle case where the book does not exist
  }

  const handleGoBack = () => {
    navigate("/reader");
  }

  return (
    <div className="book-details p-6 h-screen">
      {/* Chevron for navigating back */}
      <div className="flex items-center mb-4">
        <button onClick={handleGoBack} className="flex items-center text-blue-500 hover:text-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
      <div className="flex">
        {/* Book cover */}
        <img src={`/api/v1/file/${book.cover}`} alt={book.title} className="w-32 h-48 rounded-md shadow-lg" />
        {/* Book Information */}
        <div className="ml-6">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p className="text-xl italic">By {book.author.name}</p>
          <p className="mt-2">Rating: ⭐ {book.rating}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">Borrow</button>
          <button className="bg-gray-300 text-black px-4 py-2 rounded ml-2 mt-4 hover:bg-gray-400">Rate</button>
        </div>
      </div>
      {/* Book description */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Description</h2>
        <p className="text-gray-700 mt-2">{book.description}</p>
      </div>
      {/* Comments section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Comments</h2>
        <div className="mt-4 space-y-4">
          {book.comments.map((comment, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-md shadow-sm">
              <p className="font-semibold">{comment.user.name}</p>
              <p className="text-gray-600">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
