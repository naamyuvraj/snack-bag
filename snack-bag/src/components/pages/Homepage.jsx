import React, { useState, useEffect } from "react";
import Cards from "../cards";
import { ShoppingCart, SquareUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Famous from "./Famous";

const slides = [
  "You are here ,because you are highly addicted to snacks.",
  "Explore our vast collection of snacks.",
  "Find your favorite snacks.",
  "Enjoy the best prices.",
  "Get ready for a snack attack!",
  "Satisfy your cravings.",
  "Discover amazing features.",
  "Join us today!",
];

export default function Homepage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Ensure navigate is initialized

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] pt-7 w-full h-full"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <nav className="pb-7 flex justify-between px-6 items-center">
          <SquareUserRound
            className="w-10 h-10 text-[#ECD9BA] hover:text-black transition"
            onClick={() => navigate("/profile")} // Navigate to profile page
          />
          <span
            className="text-sm text-[#ECD9BA] hover:text-black transition cursor-pointer"
            onClick={() => navigate("/login")} // Navigate to login page
          >
            Login
          </span>
          <ShoppingCart
            className="w-10 h-10 text-[#238b45] hover:text-black transition"
            onClick={() => navigate("/cart")} // Navigate to cart page
          />
        </nav>
        <hr className="border-[#ECD9BA] w-[95%] m-auto border-1" />
        <br />
        <div className="mr-5">
          <h1 className="text-left text-5xl font-bold text-[#238b45] ml-6">
            Yup,
          </h1>
          <h1 className="text-left text-5xl font-bold text-[#ECD9BA] ml-6">
            You are
          </h1>
          <h1 className="text-left text-5xl font-bold text-[#238b45] ml-6">
            Hungaryyyyy...
          </h1>
        </div>
        <br />
        <div className="relative m-auto w-[90%] max-w-2xl h-80 overflow-hidden rounded-xl shadow-lg bg-white p-8 flex items-start justify-center text-center">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((text, index) => (
              <div
                key={index}
                className="min-w-full h-96 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-gray-800"
              >
                {text}
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-black" : "bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="mx-5">
          <Cards />
        </div>
        <br />
        <hr className="border-[#ECD9BA] w-[95%] m-auto border-1" />
        <footer className="bg-[#ff6d6e]] text-[#ECD9BA] py-8 mt- shadow-inner">
          <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="space-y-2 md:space-y-0 md:space-x-6 flex flex-col md:flex-row">
              <a href="#about" className="text-xl hover:underline">
                About Us
              </a>
              <a href="#contact" className="text-xl hover:underline">
                Contact Us
              </a>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                <span className="text-[#238b45]">Snack</span> Bag
              </h3>
              <p className="text-sm">
                Made with ❤️ by <span className="text-[#238b45]">Snack</span>{" "}
                Bag Team
              </p>
              <p className="text-sm">&copy; 2025 Snack Bag. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
