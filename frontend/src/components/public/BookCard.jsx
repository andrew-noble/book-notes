import React from "react";

export default function BookCard({ book }) {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1 bg-slate-300 p-6">
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
      <div className="col-span-2 bg-slate-200 p-6">{book.notes}</div>
    </div>
  );
}
