import ConfirmButton from "../components/private/ConfirmButton";
import Button from "../components/private/Button";
import BookCard from "../components/public/BookCard";

export default function AdminHome() {
  return (
    <div className="container mx-auto px-4 py-8">
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
    </div>
  );
}
