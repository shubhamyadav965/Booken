import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./home/Home";
import Signup from "./components/Signup";
import { useAuth } from "./context/AuthProvider";
import BooksPage from "./pages/BooksPage";
import ContactPage from "./pages/ContactPage";
import MyLibraryPage from "./pages/MyLibraryPage";

function App() {
  const [authUser] = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/library"
          element={authUser ? <MyLibraryPage /> : <Navigate to="/" />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
