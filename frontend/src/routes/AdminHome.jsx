import ConfirmButton from "../components/private/ConfirmButton";
import Button from "../components/private/Button";
import BookCard from "../components/public/BookCard";
import { Link } from "react-router-dom";

export default function AdminHome({ books, dispatch, handleEditNav }) {
  return (
    <>
      {books.map((book) => {
        return (
          <div key={book.id} className="outline outline-1 my-5">
            <BookCard book={book} />
            <div className="py-1 flex flex-row place-content-center">
              <ConfirmButton
                action={() => dispatch({ type: "delete-book", payload: book })}
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
