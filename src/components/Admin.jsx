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
    reset(); // Reset the form after cancel
  };
  return (
    <div className="container mt-4">
      <h2>Add Books</h2>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#addBooksModal"
      >
        Add Books
      </button>
      {bookInfo && (
        <Link to="/showAdmin" className="btn btn-success ml-2">
          Show AllBooks
        </Link>
      )}
      <div
        className={`modal ${isModalOpen ? "show" : ""}`}
        id="addBooksModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Books
              </h5>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setModalOpen(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <BookForm
                formTitle="Add Book"
                onSubmit={handleAddBook}
                onCancel={handleCancel}
                formReset={reset}
              />
            </div>
          </div>
        </div>
      </div>

      {formSubmitted && (
        <p className="mt-3 text-success">Form submitted successfully!</p>
      )}
    </div>
  );
};

export default Admin;
