import { React, useReducer, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import PublicHome from "./routes/PublicHome";
import AdminHome from "./routes/AdminHome";
import Header from "./components/public/Header";
import Footer from "./components/public/Footer";
import { createBook, readAllBooks, updateBook, deleteBook } from "./api";
import "./App.css";

const isPublic = import.meta.env.VITE_IS_PUBLIC;

//The "CUD" in CRUD
function reducer(state, action) {
  switch (action.type) {
    case "init-books":
      return action.payload;
    case "create-book":
      createBook(action.payload);
      return [...state, action.payload];

    case "update-book":
      updateBook(action.payload.id, action.payload);
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );

    case "delete-book":
      deleteBook(action.payload.id);
      return state.filter((book) => book.id != action.payload.id);
  }
}

export default function App() {
  const [books, dispatch] = useReducer(reducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  //the "R" in CRUD
  useEffect(() => {
    //necessary wrapper bc useEffect doesn't support async/await
    async function fetchData() {
      try {
        const books = await axios.get("http://localhost:3000/");
        dispatch({ type: "init-books", payload: books.data });
        setIsLoaded(true);
      } catch (e) {
        console.log("Error fetching data from API: ", e);
      }
    }

    fetchData();
  }, []);

  //effect for writing to backend (CUD operations). Only runs when booklist changes.
  useEffect(() => {
    async function fetchData() {
      const books = await axios.get("http://localhost:3000/");
    }

    fetchData();
  }, [books]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <main className="max-w-4xl container mx-auto px-4 py-8">
        {isLoaded ? (
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  isPublic ? (
                    <PublicHome books={books} />
                  ) : (
                    <AdminHome books={books} />
                  )
                }
              />
            </Routes>
          </BrowserRouter>
        ) : (
          <p>Loading...</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
