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
      setValue("rowNo", initialData.rowNo);
      setValue("bookCount", initialData.bookCount);
      setValue("bookCost", initialData.bookCost);
      setValue("availability", initialData.availability);
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

  const handleFormSubmit = (data) => {
    if (isEdit) {
      onSubmit({ ...data, isbn: initialData.isbn });
    } else {
      onSubmit(data);
    }
    reset();
  };
  const handleInput = (e) => {
    const value = parseInt(e.target.value, 10);
    setValue(e.target.name, value > 0 ? value : 1);
  };
  return (
    <div className="mx-auto max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">{formTitle}</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <label htmlFor="bookName">Book Name:</label>
          <input
            type="text"
            className={`form-control ${errors.bookName ? "is-invalid" : ""}`}
            id="bookName"
            {...register("bookName", { required: true, min: 20 })}
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
            <div className="mb-4">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2"
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
            onInput={handleInput}
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
            onInput={handleInput}
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
            onInput={handleInput}
          />
          {errors.bookCost && (
            <div className="invalid-feedback">
              Please enter a valid Book Cost
            </div>
          )}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2"
          >
            {isEdit ? "Save" : "Add"}
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
