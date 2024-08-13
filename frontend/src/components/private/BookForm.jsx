import Button from "./Button";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookForm({ books, dispatch }) {
  const params = useParams();
  const id = parseInt(params.id);
  const thisBook = books.find((book) => book.id === id);

  const navigate = useNavigate();
  const [formData, setFormData] = useState(thisBook);

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleBack() {
    if (formChanged) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  }

  function handleSubmit() {
    dispatch({ type: "update-book", payload: thisBook });
    navigate("/");
  }

  const inputClass =
    "block px-3 py-2 my-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500";
  const fieldsetClass = "mb-6 p-8 rounded-lg bg-slate-200";
  const legendClass = "p-2 rounded-lg bg-slate-500 text-white";

  return (
    <div className="w-auto">
      <form className="flex flex-row gap-8">
        <fieldset className={fieldsetClass}>
          <legend className={legendClass}>Book Details</legend>
          <label htmlFor="title">Title of the book:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="title"
            className={inputClass}
          ></input>

          <label htmlFor="author">Author's name:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="author"
            className={inputClass}
          ></input>

          <label htmlFor="genre">Genre (whatever you want):</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="genre"
            className={inputClass}
          ></input>

          <label htmlFor="date">Date completed:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="date"
            className={inputClass}
          ></input>

          <label htmlFor="rating">Rating (out of 3):</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="rating out of 3"
            className={inputClass}
          ></input>
        </fieldset>

        <fieldset className={`${fieldsetClass} grow`}>
          <legend className={legendClass}>Thoughts on the book:</legend>
          <textarea
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="notes"
            className={`${inputClass} h-96 w-full`}
          ></textarea>
        </fieldset>
      </form>
      <Button action={handleSubmit}>Save Changes</Button>
      <Button action={handleBack}>Back</Button>
    </div>
  );
}
