import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

function Cards({ item }) {
  const [imageError, setImageError] = useState(false);
  const [authUser] = useAuth();
  
  const fallbackImage = "https://via.placeholder.com/400x300?text=Book+Cover";

  const handleImageError = () => {
    console.warn(`Failed to load image for "${item.name}":`, item.image);
    setImageError(true);
  };

  const handleBuyNow = async () => {
    if (!authUser) {
      toast.error("Please login to purchase books");
      setTimeout(() => {
        document.getElementById("my_modal_3").showModal();
      }, 1000);
      return;
    }

    const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

    try {
      // Add to library
      await axios.post(`${API_URL}/library`, {
        userId: authUser._id,
        bookId: item._id,
        price: item.price || 0,
      });

      if (item.category === "Free") {
        toast.success(`"${item.name}" added to your library! It's free! 🎉`);
      } else {
        toast.success(`"${item.name}" purchased successfully! Check My Library 📚`, {
          duration: 3000,
          icon: "💳",
        });
      }
    } catch (error) {
      if (error.response?.data?.message === "Book already in your library") {
        toast.error("You already own this book! Check My Library");
      } else {
        toast.error("Failed to add book. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
          <figure>
            <img 
              src={imageError ? fallbackImage : item.image} 
              alt={item.name}
              onError={handleImageError}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline">
                {item.price === 0 ? "FREE" : `$${item.price}`}
              </div>
              <button
                onClick={handleBuyNow}
                className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200"
              >
                {item.category === "Free" ? "Get Free" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
