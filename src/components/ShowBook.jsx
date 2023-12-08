import React, { useContext } from "react";
import { BookContext } from "../utils/BookContext";
import { useParams } from "react-router-dom";
import Barcode from "react-barcode";

function ShowBook() {
  const { bookInfo } = useContext(BookContext);
  const { bookId } = useParams();

  // Find the book with the matching bookId in the bookInfo array
  const book = bookInfo.find((book) => book.isbn === bookId);

  return (
    <div className="flex  justify-center mt-5">
      {book ? (
        <div className="bg-white p-8 rounded shadow flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">{book.bookName}</h2>
          <p className="text-lg mb-2">
            <span className="font-semibold">Category:</span> {book.category}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Book Count:</span> {book.bookCount}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Book Cost:</span> {book.bookCost}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold">Availability:</span>{" "}
            {book.availability}
          </p>

          {/* Barcode */}
          <div className="mt-8">
            <Barcode value={book.isbn} />
          </div>
        </div>
      ) : (
        <p className="text-red-500">Book not found</p>
      )}
    </div>
  );
}

export default ShowBook;
