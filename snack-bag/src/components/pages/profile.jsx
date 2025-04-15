import React from "react";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";

export default function User({ UserName }) {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-[#000000] to-[#3c3c3c] py-10 px-5 font-[Poppins,sans-serif]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
        <div className="flex flex-row justify-between md:w-1/2 w-[230px] mt-5 mb-4">
          <div className="text-5xl text-[#ECD9BA]" onClick={() => navigate("/")}>
            <button>
              <IoChevronBackCircleOutline />
            </button>
          </div>
          <div className="text-3xl mt-1 text-[#ECD9BA]">My Profile</div>
          
        </div>
        <hr className="border-1 border-[#ECD9BA] mx-auto mb-7 w-[95%]" />

      <div className="bg-[#1f1f1f] rounded-2xl shadow-lg p-6 flex items-center gap-6 max-w-xl mx-auto mb-10 hover:scale-[1.01] transition">
        <CircleUserRound className="text-[#238b45] w-20 h-20" />
        <div>
          <h2 className="text-xl text-[#ECD9BA] font-semibold">Welcome,</h2>
          <p className="text-lg text-[#238b45] font-medium">{UserName}</p>
        </div>
      </div>

      <div
        className="bg-[#1f1f1f] rounded-2xl shadow-md p-4 cursor-pointer hover:bg-[#2c2c2c] transition max-w-xl mx-auto flex items-center justify-between group"
        onClick={() => navigate("/history")}
      >
        <h3 className="text-xl text-[#ECD9BA] font-semibold group-hover:text-[#ff6d6e]">
          View Order History
        </h3>
        <span className="text-[#238b45] font-bold text-2xl group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
      <br />
      <div
        className="bg-[#1f1f1f] rounded-2xl shadow-md p-4 cursor-pointer hover:bg-[#2c2c2c] transition max-w-xl mx-auto flex items-center justify-between group"
        onClick={() => navigate("/history")}
      >
        <h3 className="text-xl text-[#ECD9BA] font-semibold group-hover:text-[#ff6d6e]">
          Contact Us
        </h3>
        <span className="text-[#238b45] font-bold text-2xl group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
      <br />
      <div
        className="bg-[#1f1f1f] rounded-2xl shadow-md p-4 cursor-pointer hover:bg-[#2c2c2c] transition max-w-xl mx-auto flex items-center justify-between group"
        onClick={() => navigate("/login")}
      >
        <h3 className="text-xl text-[#ECD9BA] font-semibold group-hover:text-[#ff6d6e]">
          Login/Sign Up
        </h3>
        <span className="text-[#238b45] font-bold text-2xl group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </div>
  );
}
