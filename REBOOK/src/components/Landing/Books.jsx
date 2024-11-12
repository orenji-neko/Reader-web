import { useEffect, useState } from "react";
import cover from "../assets/mein_kampf.jpg";
import Book from "../components/Book";

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        let temp_books = [];
        // this is temp
        for(let i = 0; i < 10; i++) {
            temp_books.push({
                title: "Mein Kampf",
                author: "Adolf Hitler",
                cover: cover
            })
        }
        setBooks(temp_books)
    }, [])

    return (
        <div className="w-full bg-red-100">
            {
                books && books.map((book, index) => (
                    <Book key={index} title={book.title} author={book.author} coverSrc={book.cover}/>
                ))
            }
        </div>
    )
}

export default Books;