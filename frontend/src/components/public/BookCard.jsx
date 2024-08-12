import React from "react";

export default function BookCard() {
  const book = {
    title: "Think",
    author: "Simon Blackburn",
    notes: "Just okay",
    genre: "Philosophy",
    date: "2024-08-07",
    rating: "2",
  };

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1 bg-orange-500">
        <ul>
          <li>
            <h2 className="font-bold">{book.title}</h2>
          </li>
          <li>Author: {book.author}</li>
          <li>Genre: {book.genre}</li>
          <li>Date: {book.date}</li>
          <li>Rating: {book.rating}/3</li>
        </ul>
      </div>
      <div className="col-span-2 bg-orange-200">{book.notes}</div>
    </div>
  );
}
