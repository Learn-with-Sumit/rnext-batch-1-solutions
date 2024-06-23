import React, { useState } from "react";
import booksData from "../../db/booksData";
import { BookGridItems } from "./BookGridItems";

export default function BookGrid({ searchTerm, sortBy }) {
  const [books, setBooks] = useState(booksData);

  const filterBySearch = (book) => {
    if (searchTerm !== "") {
      return book?.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  };

  const sortByNameYear = (a, b) => {
    switch (sortBy) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "year_asc":
        return a.publishedYear - b.publishedYear;
      case "year_desc":
        return b.publishedYear - a.publishedYear;
      default:
        return 0;
    }
  };

  const handleFav = (bookId) => {
    const newBooks = books.map((book) => {
      if (book.id === bookId) {
        return {
          ...book,
          favourite: !book.favourite,
        };
      }
      return book;
    });

    setBooks(newBooks);
  };

  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books
        .filter(filterBySearch)
        .sort(sortByNameYear)
        .map((book) => (
          <BookGridItems key={book.id} book={book} handleFav={handleFav} />
        ))}
    </div>
  );
}
