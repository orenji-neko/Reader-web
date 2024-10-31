import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const bookData = {
  "blink": {
    title: "Blink",
    author: "Malcolm Gladwell",
    cover: "/rebook-images/blink.png",
    description: `Blink by Malcolm Gladwell explores the power of quick decisions and how our brains can make snap judgments without extensive thinking. Gladwell explains the science behind these instant choices...`,
    rating: 4.5,
    comments: [
      { user: "User1", comment: "Absolutely captivating from start to finish!" },
      { user: "User2", comment: "This book rocked my way of thinking." },
      { user: "User3", comment: "Very well written. Highly recommend!" },
      { user: "User4", comment: "A must-read! Couldn't put it down." }
    ]
  },
  "1984": {
    title: "1984",
    author: "George Orwell",
    cover: "/rebook-images/1984.png",
    description: "1984 by George Orwell is a dystopian novel set in a totalitarian society ruled by Big Brother. It explores themes of surveillance, propaganda, and the loss of individuality...",
    rating: 4.7,
    comments: [
      { user: "User1", comment: "A chilling depiction of a dystopian future." },
      { user: "User2", comment: "A powerful and thought-provoking read." },
      { user: "User3", comment: "The narrative is gripping and thought-provoking." }
    ]
  },
  "hold-still": {
    title: "Hold Still",
    author: "Author 3",
    cover: "/rebook-images/hold.png",
    description: "Hold Still is a gripping novel about capturing moments and freezing time...",
    rating: 4.0,
    comments: [
      { user: "User1", comment: "Intriguing and well-paced!" },
      { user: "User2", comment: "A bit slow in some parts but overall enjoyable." }
    ]
  },
  "slow-down": {
    title: "Slow Down",
    author: "Rachelle Williams",
    cover: "/rebook-images/slow.png",
    description: "Slow Down dives into the importance of taking life at a slower pace and appreciating every moment...",
    rating: 3.8,
    comments: [
      { user: "User1", comment: "A detailed and insightful read." },
      { user: "User2", comment: "Loved the historical context!" }
    ]
  },
  "solitaire": {
    title: "Solitaire",
    author: "Alice Oseman",
    cover: "/rebook-images/solitaire.png",
    description: "Solitaire by Alice Oseman tells the story of a young woman navigating the challenges of growing up...",
    rating: 4.7,
    comments: [
      { user: "User1", comment: "Couldn't put it down. A masterpiece!" },
      { user: "User2", comment: "Inspirational and beautifully written." }
    ]
  },
  "circle": {
    title: "Circle",
    author: "Madeline Miller",
    cover: "/rebook-images/circle.png",
    description: "Circle by Madeline Miller is a retelling of ancient myths with a modern twist...",
    rating: 4.2,
    comments: [
      { user: "User1", comment: "A fascinating blend of history and mythology." },
      { user: "User2", comment: "Rich and immersive storytelling." }
    ]
  },
  "sunstroke": {
    title: "Sunstroke",
    author: "Author 3",
    cover: "/rebook-images/sunstroke.png",
    description: "Sunstroke is an exciting tale of survival under extreme conditions...",
    rating: 4.0,
    comments: [
      { user: "User1", comment: "Thrilling and well-written!" },
      { user: "User2", comment: "Kept me on the edge of my seat." }
    ]
  },
  "circles": {
    title: "Circles",
    author: "Madeline Miller",
    cover: "/rebook-images/circles.png",
    description: "Circles by Madeline Miller continues to explore ancient myths in a unique and captivating way...",
    rating: 4.3,
    comments: [
      { user: "User1", comment: "A beautifully woven tale of mythology." },
      { user: "User2", comment: "Every page is a delight." }
    ]
  },
  "book-title-3": {
    title: "Book Title 3",
    author: "Author 3",
    cover: "/rebook-images/book-title-3.png",
    description: "Book Title 3 is a captivating tale that weaves together mystery and suspense, keeping readers on the edge of their seats...",
    rating: 4.0,
    comments: [
      { user: "User1", comment: "Intriguing and well-paced!" },
      { user: "User2", comment: "A bit slow in some parts but overall enjoyable." }
    ]
  }
};

function BookDetails() {
  const { bookTitle } = useParams(); // Get the book title from the URL
  const book = bookData[bookTitle];  // Find the book details
  const navigate = useNavigate(); // Hook to navigate back

  // Function to go back to the previous page or landing page
  const handleGoBack = () => {
    navigate("/"); // Navigate back to landing page
  };

  if (!book) {
    return <p>Book not found!</p>; // Handle case where the book does not exist
  }

  return (
    <div className="book-details p-6">
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
        <img src={book.cover} alt={book.title} className="w-32 h-48 rounded-md shadow-lg" />
        {/* Book Information */}
        <div className="ml-6">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p className="text-xl italic">By {book.author}</p>
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
              <p className="font-semibold">{comment.user}</p>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
