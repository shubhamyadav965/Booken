import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const navigate = useNavigate();
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

    try {
      const res = await axiosInstance.post("/book", bookInfo);
      console.log("Book added:", res.data);
      toast.success("Book added successfully!");
      reset();
      setTimeout(() => {
        navigate("/books");
      }, 1500);
    } catch (err) {
      console.error("Error adding book:", err);
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("Cannot connect to server");
      }
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-28 flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center">Add New Book</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Book Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Book Name *
              </label>
              <input
                type="text"
                placeholder="Enter book name"
                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  Book name is required
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter book title"
                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                {...register("title")}
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter price (0 for free)"
                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                {...register("price", { required: true, min: 0 })}
              />
              {errors.price && (
                <span className="text-sm text-red-500">
                  Valid price is required
                </span>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                {...register("category", { required: true })}
              >
                <option value="">Select category</option>
                <option value="Free">Free</option>
                <option value="Programming">Programming</option>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="Business">Business</option>
              </select>
              {errors.category && (
                <span className="text-sm text-red-500">
                  Category is required
                </span>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Image URL *
              </label>
              <input
                type="url"
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <span className="text-sm text-red-500">
                  Image URL is required
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-700 duration-200"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
