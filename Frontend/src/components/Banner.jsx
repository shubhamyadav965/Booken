import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import banner from "../../public/Banner.png";

function Banner() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [authUser] = useAuth();

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success(
      "Thanks for subscribing! We'll keep you updated with new books."
    );
    setEmail("");
  };

  const handleGetStarted = () => {
    if (authUser) {
      navigate("/books");
    } else {
      navigate("/signup");
    }
  };

  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Hello, welcomes here to learn something{" "}
              <span className="text-pink-500">new everyday!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
              Discover your next great read at Booken! We offer a curated
              collection of books across all genres - from timeless classics to
              modern bestsellers. Browse our collection or explore premium
              titles. Join thousands of readers finding knowledge and
              inspiration every day.
            </p>

            {/* Newsletter for non-logged-in users */}
            {!authUser && (
              <div>
                <p className="text-sm font-semibold mb-2">
                  📧 Subscribe to our newsletter for updates:
                </p>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="email"
                    className="grow"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubscribe();
                      }
                    }}
                  />
                  <button
                    onClick={handleSubscribe}
                    className="btn btn-sm btn-ghost"
                  >
                    Subscribe
                  </button>
                </label>
              </div>
            )}

            {/* Show welcome message for logged-in users */}
            {authUser && (
              <div className="bg-pink-50 dark:bg-slate-800 p-4 rounded-lg border-2 border-pink-500">
                <p className="text-lg font-semibold">
                  Welcome back,{" "}
                  <span className="text-pink-500">{authUser.fullname}</span>! 🎉
                </p>
                <p className="text-sm mt-2">
                  Ready to continue exploring? Browse our book collection and
                  discover your next great read.
                </p>
              </div>
            )}
          </div>

          <button
            className="btn mt-6 btn-secondary btn-lg"
            onClick={handleGetStarted}
          >
            {authUser ? "Browse Books →" : "Get Started - Sign Up Free! →"}
          </button>
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt="Reading banner"
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
