import React, { useState, useContext } from "react";
import { BookContext } from "../utils/BookContext";
import BookForm from "./BookForm";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Admin = () => {
  const { reset } = useForm();
  const { bookInfo, addBookInfo } = useContext(BookContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleAddBook = (data) => {
    setFormSubmitted(true);
    addBookInfo(data);
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    reset();
  };

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Add Books</h2>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setModalOpen(true)}
      >
        Add Books
      </button>

      {bookInfo && (
        <Link
          to="/showAdmin"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2  rounded hover:no-underline"
        >
          Show All Books
        </Link>
      )}

      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
          isModalOpen ? "block" : "hidden"
        }`}
      >
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div className="modal-close absolute top-0 right-0 cursor-pointer z-50 p-4">
            <button
              className="text-white text-3xl"
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>
          </div>

          <div className="modal-content py-4 text-left px-6">
            <BookForm
              formTitle="Add Book"
              onSubmit={handleAddBook}
              onCancel={handleCancel}
              formReset={reset}
            />
          </div>
        </div>
      </div>

      {formSubmitted && (
        <p className="mt-3 text-green-500">Form submitted successfully!</p>
      )}
    </div>
  );
};

export default Admin;
