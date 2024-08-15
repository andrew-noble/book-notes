import Button from "./Button";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function BookForm({ books, handleCreate, handleUpdate }) {
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

  function handleSubmit(event) {
    event.preventDefault();
    id ? handleUpdate(formData) : handleCreate(formData);
    navigate("/");
  }

  const inputClass =
    "block px-3 py-2 my-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500";
  const fieldsetClass = "mb-6 p-8 rounded-lg bg-slate-200";
  const legendClass = "p-2 rounded-lg bg-slate-500 text-white";

  return (
    <div className="w-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-8">
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
        </div>
        {/* Submit button (rather than onClick) used here to leverage my lazy, html-side form validation */}
        <button
          className="my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          {id ? "Save Changes" : "Add Book"}
        </button>
      </form>

      <Button>
        <Link to={"/"}>Home</Link>
      </Button>
      <div>
        <p>Here's how I think about the ratings:</p>
        <ul>
          <li>
            1: Good enough to make it through, but not a lot of meaningful
            information
          </li>
          <li>2: Interesting, little urge to re-read</li>
          <li>
            3: An amazing book, I know there is more for me to get in here
          </li>
        </ul>
      </div>
    </div>
  );
}
