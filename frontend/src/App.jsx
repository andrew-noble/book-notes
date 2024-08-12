import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicHome from "./routes/PublicHome";
import AdminHome from "./routes/AdminHome";
import "./App.css";

const isPublic = import.meta.env.VITE_IS_PUBLIC;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isPublic ? <PublicHome /> : <AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
}
