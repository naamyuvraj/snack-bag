import React, { useState, useEffect } from "react";
import Cards from "./cards";
import { ShoppingCart,History } from "lucide-react";
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
      <div className="pb-10 bg-[#F3CA52]">
        <div className="md:ml-220 ml-70 flex flex-row gap-5">
        <nav className="pt-5 pb-7 flex justify-end pr-5 bg-gradient-to-b from-[#F6E9B2] to-[#F3CA52]">
          <ShoppingCart className="w-10 h-10 text-[#0A6847] hover:text-black transition"
          onClick={()=>navigate("/Cart")} />
        </nav>
        <nav className="pt-5 pb-7 flex justify-end pr-5 bg-gradient-to-b from-[#F6E9B2] to-[#F3CA52]">
          <History className="w-10 h-10 text-[#0A6847] hover:text-black transition"
          onClick={()=>navigate("/history")} />
        </nav>
        </div>

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
