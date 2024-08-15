import ConfirmButton from "../components/ConfirmButton";
import Button from "../components/Button";
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";

export default function AdminHome({ books, handleDelete }) {
  return (
    <>
      <Button>
        <Link to={"/add"}>Add a Book</Link>
      </Button>
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
              <Button>
                <Link to={`/edit/${book.id}`}>Edit</Link>
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
