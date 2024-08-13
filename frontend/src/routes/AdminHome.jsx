import ConfirmButton from "../components/private/ConfirmButton";
import Button from "../components/private/Button";
import BookCard from "../components/public/BookCard";

export default function AdminHome({ books, dispatch }) {
  return (
    <>
      {books.map((book) => {
        return (
          <div className="outline outline-1 my-5">
            <BookCard book={book} />
            <div className="py-1 flex flex-row place-content-center">
              <ConfirmButton
                action={() => dispatch({ type: "delete-book", payload: book })}
                confirmText="Really Delete?"
              >
                Delete
              </ConfirmButton>
              <Button>Edit</Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
