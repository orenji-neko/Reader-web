import React, { useState, useEffect } from 'react';

const Search = ({ onBookSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        const response = await fetch(`/api/v1/books?search=${query}`);
        const data = await response.json();
        // Filter the books based on the title in frontend (as a fallback)
        const filteredBooks = data.filter(book => 
          book.title.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filteredBooks);
      } else {
        setSuggestions([]);
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceFetch);
  }, [query]);

  const handleSelect = (book) => {
    onBookSelect(book);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search by title..."
        className="w-full rounded-full px-4 py-1"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 top-full bg-white border border-gray-300 rounded-lg mt-1">
          {suggestions.map((book) => (
            <li
              key={book.id}
              className="px-4 py-2 hover:bg-gray-200 rounded-2xl cursor-pointer"
              onClick={() => handleSelect(book)}
            >
              {book.title} by {book.author?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
