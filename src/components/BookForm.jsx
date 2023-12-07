import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const BookForm = ({
  onSubmit,
  formTitle,
  initialData,
  onCancel,
  formReset,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [generatedISBN, setGeneratedISBN] = useState(null);

  useEffect(() => {
    if (initialData) {
      setValue("bookName", initialData.bookName);
      setValue("isbn", initialData.isbn);
      setValue("category", initialData.category);
      setIsEdit(true);
    }
  }, [initialData, setValue]);

  const generateISBN = () => {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let newISBN;
    do {
      const part1 = getRandomInt(100, 999);
      const part2 = getRandomInt(0, 9);
      const part3 = getRandomInt(0, 99);
      const part4 = getRandomInt(0, 999999);
      const part5 = getRandomInt(0, 9);

      newISBN = `${part1}-${part2}-${part3}-${part4}-${part5}`;
    } while (generatedISBN === newISBN);

    setGeneratedISBN(newISBN);
    setValue("isbn", newISBN);
  };
  const handleCancel = () => {
    onCancel();
    reset();
  };

  const handleAddBook = (data) => {
    onSubmit(data);
    reset();

  };
  return (
    <div>
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit(handleAddBook)}>
        <div className="form-group">
          <label htmlFor="bookName">Book Name:</label>
          <input
            type="text"
            className={`form-control ${errors.bookName ? "is-invalid" : ""}`}
            id="bookName"
            {...register("bookName", { required: true })}
          />
          {errors.bookName && (
            <div className="invalid-feedback">Book Name is required</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="isbn">ISBN No:</label>

          <div className="input-group">
            <input
              type="text"
              className={`form-control ${errors.isbn ? "is-invalid" : ""}`}
              id="isbn"
              {...register("isbn", {
                required: true,
                pattern: /^(?:\d{3}-)\d{1,5}-\d{1,7}-\d{1,7}-\d{1,13}$/i,
              })}
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={generateISBN}
              >
                Generate ISBN
              </button>
            </div>
          </div>
          {errors.isbn && (
            <div className="invalid-feedback">Please enter a valid ISBN</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            className={`form-control ${errors.category ? "is-invalid" : ""}`}
            id="category"
            {...register("category", { required: true })}
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Mystery">Mystery</option>
          </select>
          {errors.category && (
            <div className="invalid-feedback">Category is required</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="rowNo">Row No:</label>
          <input
            type="number"
            className={`form-control ${errors.rowNo ? "is-invalid" : ""}`}
            id="rowNo"
            {...register("rowNo", {
              required: true,
              min: 1,
              pattern: /^[1-9]\d*$/,
            })}
          />
          {errors.rowNo && (
            <div className="invalid-feedback">Please enter a valid Row No</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="bookCount">Book Count:</label>
          <input
            type="number"
            className={`form-control ${errors.bookCount ? "is-invalid" : ""}`}
            id="bookCount"
            {...register("bookCount", {
              required: true,
              min: 1,
              pattern: /^[1-9]\d*$/,
            })}
          />
          {errors.bookCount && (
            <div className="invalid-feedback">
              Please enter a valid Book Count
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="availability">Availability:</label>
          <select
            className={`form-control ${
              errors.availability ? "is-invalid" : ""
            }`}
            id="availability"
            {...register("availability", { required: true })}
          >
            <option value="">Select Availability</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.availability && (
            <div className="invalid-feedback">Availability is required</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="bookCost">Book Cost:</label>
          <input
            type="number"
            className={`form-control ${errors.bookCost ? "is-invalid" : ""}`}
            id="bookCost"
            {...register("bookCost", {
              required: true,
              min: 1,
              pattern: /^[1-9]\d*$/,
            })}
          />
          {errors.bookCost && (
            <div className="invalid-feedback">
              Please enter a valid Book Cost
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? "Save" : "Add"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-toggle="modal"
          data-target="#addBooksModal"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default BookForm;
