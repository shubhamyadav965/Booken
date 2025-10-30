import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Thank you! We'll get back to you soon.");
    reset();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl font-bold">
            Contact <span className="text-pink-500">Us</span>
          </h1>
          <p className="mt-6">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="mt-12 flex items-center justify-center">
          <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">Name is required</span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    Email is required
                  </span>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="What's this about?"
                  className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                  {...register("subject", { required: true })}
                />
                {errors.subject && (
                  <span className="text-sm text-red-500">
                    Subject is required
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  placeholder="Tell us more..."
                  rows="5"
                  className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700"
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <span className="text-sm text-red-500">
                    Message is required
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-700 duration-200"
              >
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold mb-3">Other Ways to Reach Us</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> support@booken.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Address:</strong> 123 Book Street, Reading City, RC
                  12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
