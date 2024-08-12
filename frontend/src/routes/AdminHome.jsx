import ConfirmButton from "../components/private/ConfirmButton";
import BookCard from "../components/public/BookCard";

export default function AdminHome() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BookCard />
      <ConfirmButton confirmText="Really Delete?" initialText="delete" />
    </div>
  );
}
