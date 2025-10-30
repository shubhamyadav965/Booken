import React from "react";
import Navbar from "../components/Navbar";
import MyLibrary from "../components/MyLibrary";
import Footer from "../components/Footer";

function MyLibraryPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <MyLibrary />
      </div>
      <Footer />
    </>
  );
}

export default MyLibraryPage;
