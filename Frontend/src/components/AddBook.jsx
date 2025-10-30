import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function AddBook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const bookInfo = {
      name: data.name,
      title: data.title,
      price: parseFloat(data.price),
      category: data.category,
      image: data.image,
    };

    const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

    try {
      const res = await axios.post(`${API_URL}/book`, bookInfo);
      if (res.data) {
        toast.success("Book added successfully!");
        reset(); // Clear form
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error: " + (err.response?.data?.message || "Failed to add book"));
    }
  };

  return (
    <dialog id="add_book_modal" className="modal">
      <div className="modal-box dark:bg-slate-800 dark:text-white">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Add New Book</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Book Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Book Name *</label>
            <input
              type="text"
              placeholder="e.g., The Great Gatsby"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Title/Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <input
              type="text"
              placeholder="e.g., A classic American novel"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price ($) *</label>
            <input
              type="number"
              step="0.01"
              placeholder="0 for free books"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
              {...register("price", { required: true, min: 0 })}
            />
            {errors.price && (
              <span className="text-sm text-red-500">Valid price required</span>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
              {...register("category", { required: true })}
            >
              <option value="">Select category</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>
            {errors.category && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Image URL *</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-sm text-red-500">Valid URL required</span>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Tip: Use Unsplash, Pexels, or upload to Imgur
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-700 duration-200"
          >
            Add Book
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default AddBook;
