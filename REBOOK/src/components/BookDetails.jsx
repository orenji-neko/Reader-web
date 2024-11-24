import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

function BookDetails() {
  const { bookId } = useParams(); // Get the book title from the URL
  const navigate = useNavigate(); // Hook to navigate back

  const [book, setBook] = useState(null); // book details
  const { token, validate } = useAuth();

  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    const load = async () => {
      const book_response = await fetch(`/api/v1/book/${bookId}`, { 
        method: "GET",
        headers: {
          "Authorization": token
        }
      });
      const book_result = await book_response.json();
      setBook(book_result);

      const user = await validate();
      const isBookMatch = book_result.ratings.find(rating => rating.readerId === user.id) ? true : false;
      setIsRated(isBookMatch);
    }

    const id = setTimeout(load, 1000);

    return () => clearTimeout(id);
  }, [book, bookId, token, validate]);

  if (!book) {
    return <p>Book not found!</p>; // Handle case where the book does not exist
  }

  const handleGoBack = () => {
    navigate("/reader");
  }

  const borrow = async (id) => {
    try {
      const formData = new FormData()
      formData.append("bookId", id);

      const response = await fetch(`/api/v1/request`, {
        method: "POST",
        headers: {
          "Authorization": token
        },
        body: formData
      })
      const result = await response.json()
      alert("Success: ", result)
    }
    catch(err) {
      alert("Error: ", err)
    }
  }

  const rate = async (id) => {
    const response = await fetch("/api/v1/rating", {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bookId: id.toString()
      })
    })

    const result = await response.json()
    console.log(result);
    alert("rated book!")
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
          <p className="text-xl italic">By {book.author ? book.author.name : '' }</p>
          <p className="mt-2">Rating: ⭐ {book.rating}</p>
          <button className="bg-teal-500 text-white px-4 py-2 w-40 rounded mt-4 hover:bg-teal-600 disabled:bg-gray-500"
        onClick={() => { borrow(book.id) }}
        disabled={book.available <= 0}
      >
        Borrow
</button>

<button 
            className={`text-black px-4 py-2 rounded ml-2 mt-4 hover:bg-gray-400 ${ isRated ? 'bg-white' : 'bg-white' } `}
            onClick={() => rate(book.id)}
        >
            <FontAwesomeIcon icon={isRated ? faStarRegular : faStarRegular} className="mr-2" />
            {isRated ? 'Rated' : 'Rate'}
        </button>
        </div>
      </div>
      {/* Book description and comments */}
      <div className="mt-6 flex">
        {/* Book description */}
        <div className="flex-1 mr-8">
          <h2 className="text-2xl font-bold">Description</h2>
          <p className="mt-2 text-gray-700" style={{ lineHeight: '1.5' }}>
            {book.description}
          </p>
        </div>
        {/* Comments section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Comments</h2>
          <div
            className="mt-2 space-y-2 pr-2"
            style={{
              maxHeight: '200px', // Set a max-height to make it scrollable
              overflowY: 'auto',
              paddingRight: '8px', // Adds padding between content and scrollbar
            }}
          >
            {book.comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-md shadow-sm" style={{ lineHeight: '1.5' }}>
                <p className="font-semibold">{comment.user.name}</p>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
