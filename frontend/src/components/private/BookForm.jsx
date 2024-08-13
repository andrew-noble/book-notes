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

  return (
    <form>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="title"
      ></input>
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="author"
      ></input>
      <input
        type="text"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        placeholder="genre"
      ></input>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="date"
      ></input>
      <input
        type="number"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        placeholder="rating out of 3"
      ></input>
      <input
        type="text"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="notes"
      ></input>
      <Button action={handleSubmit}>Save Changes</Button>
      <Button action={handleBack}>Back</Button>
    </form>
  );
}
