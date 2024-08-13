import Button from "./Button";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookForm({ books, dispatch }) {
  const { id } = useParams();
  const thisBook = id ? books.find((book) => book.id === parseInt(id)) : null;

  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    thisBook || {
      title: "",
      author: "",
      genre: "",
      date: "",
      rating: "",
      notes: "",
    }
  );

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit() {
    id
      ? dispatch({ type: "update-book", payload: formData })
      : dispatch({ type: "create-book", payload: formData });

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
            required
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
          ></input>

          <label htmlFor="author">Author's name:</label>
          <input
            type="text"
            name="author"
            required
            value={formData.author}
            onChange={handleChange}
            className={inputClass}
          ></input>

          <label htmlFor="genre">Genre (whatever you want):</label>
          <input
            type="text"
            name="genre"
            required
            value={formData.genre}
            onChange={handleChange}
            className={inputClass}
          ></input>

          <label htmlFor="date">Date completed:</label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className={inputClass}
          ></input>

          <label htmlFor="rating">Rating (out of 3):</label>
          <input
            type="number"
            name="rating"
            required
            value={formData.rating}
            onChange={handleChange}
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
    </div>
  );
}
