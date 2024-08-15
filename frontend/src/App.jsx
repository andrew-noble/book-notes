import { React, useReducer, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookForm from "./components/BookForm";
import BookApi from "./api";
import "./App.css";

const api = BookApi();

//internal state reducer. Mirrors the database via the handle functions below.
function reducer(state, action) {
  switch (action.type) {
    case "init-books":
      console.log("Books loaded from backend");
      return action.payload;

    case "create-book":
      return [...state, action.payload];

    case "update-book":
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );

    case "delete-book":
      return state.filter((book) => book.id !== action.payload.id);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  //the "R" in CRUD
  useEffect(() => {
    //necessary wrapper bc useEffect doesn't support async/await
    async function fetchData() {
      try {
        const result = await api.readAllBooks();
        dispatch({ type: "init-books", payload: result });
        setIsLoaded(true);
      } catch (e) {
        console.log("Error fetching data from API: ", e);
      }
    }

    fetchData();
  }, []);

  //the "CUD" in CRUD
  async function handleCreate(book) {
    console.log("New book created");
    const newBook = await api.createBook(book); //update external db via api call
    dispatch({ type: "create-book", payload: newBook }); //then update internal state
  }

  async function handleUpdate(book) {
    console.log("Book edited");
    const updatedBook = await api.updateBook(book);
    dispatch({ type: "update-book", payload: updatedBook });
  }

  async function handleDelete(book) {
    console.log("Book deleted");
    await api.deleteBook(book);
    dispatch({ type: "delete-book", payload: book });
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <BrowserRouter>
        <Header />
        <main className="container mx-auto px-4 py-8">
          {isLoaded ? (
            <Routes>
              <Route
                path="/"
                element={
                  <BookList
                    className="max-w-4xl"
                    books={state}
                    handleDelete={handleDelete}
                  />
                }
              />
              <Route
                path="/edit/:id"
                element={<BookForm handleUpdate={handleUpdate} books={state} />}
              ></Route>
              <Route
                path="/add"
                element={<BookForm handleCreate={handleCreate} books={state} />}
              ></Route>
            </Routes>
          ) : (
            <p>Loading...</p>
          )}
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
