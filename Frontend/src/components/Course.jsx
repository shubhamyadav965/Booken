import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axiosInstance from "../api/axios.js";
import { Link } from "react-router-dom";
function Course() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axiosInstance.get("/book");
        console.log("All books loaded:", res.data);
        setBook(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };
    getBook();
  }, []);

  if (loading) {
    return (
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 text-center">
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :)</span>
          </h1>
          <p className="mt-12">
            Explore our complete catalog of books and courses. From free
            educational content to premium learning materials, find everything
            you need to advance your knowledge. Browse our entire collection
            below.
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back to Home
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {book.length > 0 ? (
            book.map((item) => <Cards key={item._id} item={item} />)
          ) : (
            <p className="text-center col-span-4">No books available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Course;
