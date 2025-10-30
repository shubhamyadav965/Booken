import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios.js";
import Cards from "./Cards";
import { Link } from "react-router-dom";

function Books() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axiosInstance.get("/book");
        console.log("Books loaded:", res.data);
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
          <p>Loading books...</p>
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
            Explore our vast collection of books across various categories. From
            free educational content to premium bestsellers, find your next
            great read here!
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {book.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
