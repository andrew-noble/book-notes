import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicHome from "./routes/PublicHome";
import AdminHome from "./routes/AdminHome";
import Header from "./components/public/Header";
import Footer from "./components/public/Footer";

import "./App.css";

const isPublic = import.meta.env.VITE_IS_PUBLIC;

export default function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isPublic ? <PublicHome /> : <AdminHome />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}
