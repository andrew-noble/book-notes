import ConfirmButton from "../components/private/ConfirmButton";
import BookCard from "../components/public/BookCard";

export default function AdminHome() {
  return (
    <>
      <BookCard />
      <ConfirmButton confirmText="Really Delete?" initialText="delete" />
    </>
  );
}
