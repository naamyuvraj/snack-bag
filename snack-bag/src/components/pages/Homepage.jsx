import React, { useState, useEffect } from "react";
import Cards from "../cards";
import { ShoppingCart, SquareUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <div className="pb-15 bg-gradient-to-r from-[#000000] to-[#3c3c3c] pt-7">
        <nav className="pb-7 flex justify-between px-6 items-center">
          <SquareUserRound
            className="w-10 h-10 text-[#ECD9BA] hover:text-black transition"
            onClick={() => navigate("/profile")}
          />

          <ShoppingCart
            className="w-10 h-10 text-[#ff6d6e] hover:text-black transition"
            onClick={() => navigate("/Cart")}
          />
        </nav>
        <hr className="border-[#ECD9BA] w-[95%] m-auto border-1"  />
        <br />
        {/* thinking of personal name here */}
        <h1 className="text-left text-6xl font-bold text-[#ff6d6e] ml-6">Yup, </h1>
        <h1 className="text-left text-6xl font-bold text-[#ECD9BA] ml-6">You are</h1>
        <h1 className="text-left text-6xl font-bold text-[#ff6d6e] ml-6">Hungaryyyyy...</h1>
        
        <br />
        {/* <hr className="border-[#ECD9BA] w-[95%] m-auto" /> */}
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

        <Cards />
      </div>
    </>
  );
}
