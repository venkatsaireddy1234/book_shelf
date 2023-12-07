import React, { createContext, useEffect, useState } from "react";

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [bookInfo, setBookInfo] = useState([]);
  useEffect(() => {
    const storedBookInfo = JSON.parse(localStorage.getItem("bookInfo"));
    if (storedBookInfo) {
      setBookInfo(storedBookInfo);
    }
  }, []);

  const addBookInfo = (newBook) => {
    const updatedBookInfo = [...bookInfo, newBook]; // Adding new entry to the bookInfo object
    setBookInfo(updatedBookInfo);
    localStorage.setItem("bookInfo", JSON.stringify(updatedBookInfo)); // Save the updated bookInfo to local storage
  };
  const editBook = (updatedBook) => {
    const updatedBookInfo = bookInfo.map((book) =>
      book.isbn === updatedBook.isbn ? updatedBook : book
    );
    setBookInfo(updatedBookInfo);
    localStorage.setItem("bookInfo", JSON.stringify(updatedBookInfo));
  };
  const deleteBook = (isbn) => {
    const updatedBookInfo = bookInfo.filter((book) => book.isbn !== isbn);
    setBookInfo(updatedBookInfo);
    localStorage.setItem("bookInfo", JSON.stringify(updatedBookInfo));
  };
  return (
    <BookContext.Provider
      value={{ bookInfo, addBookInfo, deleteBook, editBook }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
