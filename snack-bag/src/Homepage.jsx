import React, { useState, useEffect } from "react";
import Cards from "./cards";
import { ShoppingCart } from 'lucide-react'

const slides = [
  "Welcome to our website!",
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

  return (
    <>
    
    <div className="pb-10 bg-gradient-to-r from-[#222222] to-[#3b3b3b]">
    <nav className="pt-5 pb-7 flex justify-end pr-5">
    <ShoppingCart className="w-10 h-10 text-[#eba10e] hover:text-black transition" />
    </nav>

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
