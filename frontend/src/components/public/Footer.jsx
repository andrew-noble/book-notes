import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-200 p-4 text-center">
      <p>
        This is a project I made to practice react. Check out the code
        here:&nbsp;
        <a href="https://github.com/andrewrn0">https://github.com/andrewrn0</a>
      </p>
      <p>Andrew Noble | Copyright ⓒ {year}</p>
    </footer>
  );
}
