import React from "react";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function User({UserName}) {
    const navigate = useNavigate();
  return (
    <div className="pb-15 bg-gradient-to-r from-[#000000] to-[#3c3c3c] pt-10 h-screen ">
      <h1 className="text-3xl text-[#ECD9BA] font-bold mb-5 mx-5 font-mono">My Profile</h1>
      <br />
      <div className="flex items-center gap-10 mb-5 ml-10">
        <CircleUserRound className="text-[#ff6d6e] w-30 h-30" />
        <h1 className="text-2xl text-[#ECD9BA] font-bold">{UserName} User name </h1>
        
      </div>
      <br />
      <hr className="border-[#ECD9BA] border-1 mb-5 " />
      <br />
      <div className="flex items-center gap-10 mb-5 ml-10" onClick={()=> navigate("/history")}>
      <h1 className="text-2xl text-[#ECD9BA] font-bold mx-5">Orders</h1>

      </div>
      <br />
      <hr className="border-[#ECD9BA] border-1 mb-5 " />

    </div>
  );
}
