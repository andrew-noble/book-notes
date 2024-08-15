import ConfirmButton from "../components/ConfirmButton";
import Button from "../components/Button";
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";

export default function AdminHome({ books, handleDelete }) {
  return (
    <>
      <Link to={"/add"}>
        <Button>Add a Book</Button>
      </Link>

      {books.map((book) => {
        return (
          <div key={book.id} className="outline outline-1 my-5">
            <BookCard book={book} />
            <div className="py-1 flex flex-row place-content-center">
              <ConfirmButton
                action={() => handleDelete(book)}
                confirmText="Really Delete?"
              >
                Delete
              </ConfirmButton>
              <Link to={`/edit/${book.id}`}>
                <Button>Edit</Button>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
