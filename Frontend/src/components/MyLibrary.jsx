import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios.js"; // Change this import
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function MyLibrary() {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      fetchLibrary();
    }
  }, [authUser]);

  const fetchLibrary = async () => {
    try {
      const res = await axiosInstance.get(`/library/${authUser._id}`); // Remove API_URL
      setLibrary(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching library:", error);
      toast.error("Failed to load library");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 text-center">
          <p>Loading your library...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl font-bold">My Library 📚</h1>
          <p className="mt-6">
            {library.length > 0
              ? `You have ${library.length} book${
                  library.length > 1 ? "s" : ""
                } in your library`
              : "Your library is empty. Start exploring books!"}
          </p>
          <Link to="/books">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Browse Books
            </button>
          </Link>
        </div>

        {library.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            {library.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-xl dark:bg-slate-900 dark:border"
              >
                <figure>
                  <img
                    src={
                      item.bookId?.image ||
                      "https://via.placeholder.com/400x300"
                    }
                    alt={item.bookId?.name}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {item.bookId?.name}
                    <div className="badge badge-success">Owned</div>
                  </h2>
                  <p>{item.bookId?.title}</p>
                  <div className="card-actions justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {item.price === 0 ? "Free" : `Paid $${item.price}`}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(item.purchaseDate).toLocaleDateString()}
                    </div>
                  </div>
                  <button className="btn btn-sm btn-primary mt-2">
                    Read Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyLibrary;
