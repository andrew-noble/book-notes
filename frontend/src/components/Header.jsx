import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <Link to={"/"}>Book Notes</Link>
    </header>
  );
}
