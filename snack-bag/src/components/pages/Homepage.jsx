import React, { useState, useEffect } from "react";
import Cards from "../cards";
import { ShoppingCart, SquareUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Famous from "./Famous";
import Footer from "./footer";
import Banner from "./banner";
import {MapPin} from "lucide-react";
const slides = [
  "https://www.youtube.com/embed/kpHBxLqkikw",
  "https://www.youtube.com/embed/iUIZcZceZf0",
  "https://www.youtube.com/embed/1SIq_mvvs2s",
  "https://www.youtube.com/embed/zQBhJD8CYm0",
];

export default function Homepage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] pt-7 w-full h-full"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <nav className="pb-5 flex justify-between px-6 items-center">
          <SquareUserRound
            className="w-10 h-10 text-[#ECD9BA] hover:text-black transition"
            onClick={() => navigate("/profile")}
          />
          <div className="text-3xl text-[#ECD9BA] font-semibold ml-[-10]">
            <h1 className="text-4xl font-bold text-[#ECD9BA]">
              <span className="text-[#238b45]">Snack</span> Bag
            </h1>
          </div>
          <ShoppingCart
            className="w-10 h-10 text-[#238b45] hover:text-black transition"
            onClick={() => navigate("/cart")}
          />
        </nav>
        <hr className="border-[#ECD9BA] w-[95%] m-auto border-1" />
        <div className="flex justify- items-center bg-[#ECD9BA] p-1 opacity-[75%] w-[95%] m-auto"><MapPin className="w-7 h-7 text-[#238b45] mt- mx-4"/><p className="text-[#238b45] mt-">Your Space Hostel, Lohegaon, Pune</p></div>
        <br />
        <div className="mr-5 mb-2">
          <h1 className="text-left text-4xl font-semibold text-[#238b45] ml-6">
            Yup,
          </h1>
          <h1 className="text-left text-5xl font-semibold text-[#ECD9BA] ml-6">
            You are
          </h1>
          <h1 className="text-left text-5xl font-semibold text-[#238b45] ml-6">
            Hungaryyyyy...
          </h1>
        </div>
        <br />
        <div className="relative m-auto w-[90%] max-w-2xl h-80 overflow-hidden rounded-xl shadow-lg bg-black">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((videoUrl, index) => (
              <div
                key={index}
                className="min-w-full h-80 flex-shrink-0 flex items-center justify-center"
              >
                <iframe
                  className="w-full h-full rounded-xl"
                  src={
                    videoUrl +
                    "?autoplay=1&mute=1&controls=0&loop=1&playlist=" +
                    videoUrl.split("/").pop()
                  }
                  title={`YouTube video ${index + 1}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-blue-500" : "bg-gray-400"
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

        <Footer />
      </div>
    </>
  );
}
