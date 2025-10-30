import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
function Course() {
  const [book, setBook] = useState([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${API_URL}/book`);
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
            Explore our complete catalog of books and courses. From free educational content 
            to premium learning materials, find everything you need to advance your knowledge. 
            Filter by category, search by topic, or browse our curated collections. 
            Happy learning!
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
          {book.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
