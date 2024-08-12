import ConfirmButton from "../components/private/ConfirmButton";
import Button from "../components/private/Button";
import BookCard from "../components/public/BookCard";

export default function AdminHome({ books }) {
  console.log(books);
  return (
    <>
      {books.map((book) => {
        return (
          <div className="outline my-5">
            <BookCard book={book} />
            <div className="py-1 flex flex-row place-content-center">
              <ConfirmButton
                // confirmAction={confirmAction}
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
