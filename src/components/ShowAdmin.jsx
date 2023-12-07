import React, { useState, useContext } from "react";
import { BookContext } from "../utils/BookContext";
import BookForm from "./BookForm";
import { useForm } from "react-hook-form";

function ShowAdmin() {
  const { reset } = useForm();
  const [isModalOpen, setModalOpen] = useState(false);

  const { bookInfo, editBook, deleteBook } = useContext(BookContext);
  const [searchTerm, SetsearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = (e) => {
    SetsearchTerm(e.target.value);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleSave = (updatedBook) => {
    
    editBook(updatedBook);
    setSelectedBook(null);
    setModalOpen(false);
  };

  const handleDelete = (isbn) => {
    deleteBook(isbn);
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="container mx-auto mt-8">
      <div>
        <input
          type="text"
          placeholder="Search by ISBN..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {bookInfo.map((book) => (
          <div key={book.isbn} className="bg-white p-4 rounded shadow">
            <p className="text-lg font-bold mb-2">Book Name: {book.bookName}</p>
            
            <button
              type="button"
              onClick={() => handleEdit(book)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(book.isbn)}
              className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isModalOpen ? "block" : "hidden"}`}>
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <BookForm
                initialData={selectedBook}
                onCancel={() => {
                  handleCancel();
                  setModalOpen(false);
                }}
                onSubmit={handleSave}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowAdmin;
