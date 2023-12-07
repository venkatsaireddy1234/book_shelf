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
    console.log("Editing book with ISBN: ", book);
    setSelectedBook(book);
    setModalOpen(true);
  };
  const handleSave = (updatedBook) => {
    editBook(updatedBook); 
    setSelectedBook(null); 
  };
  const handleDelete = (isbn) => {
    deleteBook(isbn);
  };

 

  const handleCancel = () => {
    reset(); 
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by ISBN..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="bookList">
        {bookInfo.map((book) => (
          <div key={book.isbn} className="bookItem">
            <p> Book Name :{book.bookName}</p>

            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#addBooksModal"
              onClick={() => setModalOpen(true)}
            >
              Edit
            </button>
            <div>
              <div
                className={`modal ${isModalOpen ? "show" : ""}`}
                id="editBooksModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        {" "}
                        editBook
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
                        initialData={selectedBook}
                        onCancel={handleCancel}
                        onSave={handleSave}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => handleDelete(book.isbn)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowAdmin;
