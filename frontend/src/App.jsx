import { React, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import PublicHome from "./routes/PublicHome";
import AdminHome from "./routes/AdminHome";
import Header from "./components/public/Header";
import Footer from "./components/public/Footer";
import "./App.css";

const isPublic = import.meta.env.VITE_IS_PUBLIC;

function reducer(state, action) {
  switch (action.type) {
    case "create-book":
      return [...state, action.newBook];
  }
}

export default function App() {
  const [books, dispatch] = useReducer(reducer, []);

  //effect for reading from backend (R operations). Only runs once at start.
  useEffect(() => {
    async function fetchData() {
      const books = await axios.get("http://localhost:3000/");
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
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={isPublic ? <PublicHome /> : <AdminHome />}
            />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}
