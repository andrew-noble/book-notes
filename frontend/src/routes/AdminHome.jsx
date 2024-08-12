import ConfirmButton from "../components/private/ConfirmButton";
import Button from "../components/private/Button";
import BookCard from "../components/public/BookCard";

export default function AdminHome() {
  return (
    <>
      <BookCard />
      <div className="py-4 flex flex-row place-content-center">
        <ConfirmButton
          // confirmAction={confirmAction}
          confirmText="Really Delete?"
        >
          Delete
        </ConfirmButton>
        <Button>Edit</Button>
      </div>
    </>
  );
}
